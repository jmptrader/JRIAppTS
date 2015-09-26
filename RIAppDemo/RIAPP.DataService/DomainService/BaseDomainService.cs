using RIAPP.DataService.Resources;
using RIAPP.DataService.Security;
using RIAPP.DataService.Types;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Utils.Interfaces;
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Reflection;
using System.Threading.Tasks;

namespace RIAPP.DataService
{
    public abstract class BaseDomainService: IDomainService
    {
        #region private members
        private RequestContext _requestContext;
        private bool _IsCodeGenEnabled = false;
        private IServiceContainer _serviceContainer;
        private ServiceOperationsHelper _helper;
        #endregion

        protected IQueryHelper QueryHelper
        {
            get
            {
                return this._serviceContainer.QueryHelper;
            }
        }

        public IServiceContainer ServiceContainer
        {
            get
            {
                return this._serviceContainer;
            }
        }

        protected RequestContext RequestContext
        {
            get
            {
                return this._requestContext;
            }
        }

        public BaseDomainService(IServiceArgs args)
        {
            if (args.serializer == null)
                throw new ArgumentException(ErrorStrings.ERR_NO_SERIALIZER);
            this._requestContext = new RequestContext(args.principal);
            this._serviceContainer = this.CreateServiceContainer();
            this._serviceContainer.AddService(typeof(ISerializer), args.serializer);
            this._helper = new ServiceOperationsHelper(this);
        }
      
        protected ServiceOperationType CurrentOperation
        {
            get { return this.RequestContext.CurrentOperation; }
        }

        protected ChangeSet CurrentChangeSet
        {
            get { return this.RequestContext.CurrentChangeSet; }
        }

        protected EntityChangeState CurrentChangeState
        {
            get { return this.RequestContext.CurrentRowInfo.changeState; }
        }

        protected QueryRequest CurrentQueryInfo
        {
            get { return this.RequestContext.CurrentQueryInfo; }
        }

        protected bool IsCodeGenEnabled
        {
            get
            {
                return this._IsCodeGenEnabled;
            }
            set
            {
                this._IsCodeGenEnabled = value;
            }
        }

        protected T GetOriginal<T>()
            where T : class
        {
            return this._helper.GetOriginalEntity<T>(this.RequestContext.CurrentRowInfo);
        }

        protected T GetParent<T>()
            where T : class
        {
            return this._helper.GetParentEntity<T>(this.RequestContext.CurrentRowInfo);
        }

        #region Overridable Methods
        protected virtual IServiceContainer CreateServiceContainer()
        {
            return (new ServiceContainerFactory()).CreateServiceContainer(this.GetType(), this.RequestContext.User);
        }

        protected internal abstract Metadata GetMetadata(bool isDraft);

        /// <summary>
        /// Can be used for tracking what is changed by CRUD methods
        /// </summary>
        /// <param name="dbSetName">name of the entity which is currently tracked</param>
        /// <param name="changeType">enum meaning which CRUD method was invoked</param>
        /// <param name="diffgram">xml representing values as was before and after CRUD operation</param>
        protected virtual void OnTrackChange(string dbSetName, ChangeType changeType, string diffgram) 
        { 
        }

        protected virtual internal void OnError(Exception ex)
        {

        }
     
        protected abstract Task ExecuteChangeSet();

        protected virtual Task AfterExecuteChangeSet()
        {
            return Task.FromResult<object>(null);
        }

        protected virtual void ApplyChangesToEntity(RowInfo rowInfo)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            if (dbSetInfo.EntityType == null)
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_DB_ENTITYTYPE_INVALID, dbSetInfo.dbSetName));
            try
            {
                switch (rowInfo.changeType)
                {
                    case ChangeType.Added:
                        this._helper.InsertEntity(rowInfo);
                        break;
                    case ChangeType.Deleted:
                        this._helper.DeleteEntity(rowInfo);
                        break;
                    case ChangeType.Updated:
                        this._helper.UpdateEntity(rowInfo);
                        break;
                    default:
                        throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbSetInfo.EntityType.Name, rowInfo.changeType));
                }
            }
            catch (Exception ex)
            {
                object dbEntity = rowInfo.changeState == null ? null : rowInfo.changeState.Entity;
                rowInfo.changeState = new EntityChangeState { Entity = dbEntity, Error = ex };
                this.OnError(ex);
                throw;
            }
        }

        protected virtual void TrackChangesToEntity(RowInfo rowInfo)
        {
            if (!rowInfo.dbSetInfo.isTrackChanges)
                return;
            try
            {
                string diffgram = DiffGram.GetDiffGram(rowInfo.changeState.OriginalEntity, rowInfo.changeState.Entity, rowInfo.dbSetInfo.EntityType, rowInfo.changeState.NamesOfChangedFields);
                this.OnTrackChange(rowInfo.dbSetInfo.dbSetName, rowInfo.changeType, diffgram);
            }
            catch (Exception ex)
            {
                this.OnError(ex);
            }
        }

        protected virtual T GetRefreshedEntity<T>(IQueryable<T> entities, RefreshInfo info)
            where T : class
        {
            return this.QueryHelper.GetRefreshedEntity<T>(entities, info);
        }

        protected virtual string GetTypeScript(string comment = null)
        {
            MetadataResult metadata = this.ServiceGetMetadata();
            TypeScriptHelper helper = new TypeScriptHelper(this._serviceContainer, metadata, this.GetClientTypes());
            return helper.CreateTypeScript(comment);
        }

        protected virtual string GetCSharp()
        {
            throw new NotImplementedException();
        }

        protected virtual IEnumerable<Type> GetClientTypes()
        {
            return Enumerable.Empty<Type>();
        }

        protected virtual void AuthorizeChangeSet(ChangeSet changeSet)
        {
            try
            {
                var metadata = MetadataHelper.EnsureMetadataInitialized(this);
                foreach (var dbSet in changeSet.dbSets)
                {
                    //methods on domain service which are attempted to be executed by client (SaveChanges triggers their execution)
                    Dictionary<string, MethodInfo> domainServiceMethods = new Dictionary<string, MethodInfo>();
                    DbSetInfo dbInfo = metadata.dbSets[dbSet.dbSetName];
                    this.RequestContext.CurrentDbSet = dbSet;

                    foreach (RowInfo rowInfo in dbSet.rows)
                    {
                        this.RequestContext.CurrentRowInfo = rowInfo;
                        MethodInfo methInfo = null;
                        try
                        {
                            methInfo = SecurityHelper.GetCRUDMethodInfo(dbInfo, rowInfo);
                        }
                        finally
                        {
                            this.RequestContext.CurrentRowInfo = null;
                        }

                        if (methInfo == null)
                            throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbInfo.EntityType.Name, rowInfo.changeType));

                        if (!domainServiceMethods.ContainsKey(methInfo.Name))
                        {
                            domainServiceMethods.Add(methInfo.Name, methInfo);
                        }
                    } // foreach (RowInfo rowInfo in dbSet.rows)

                    var authorizer = this.ServiceContainer.Authorizer;
                    authorizer.CheckUserRightsToExecute(domainServiceMethods.Values.ToArray());
                } //foreach (var dbSet in changeSet.dbSets)
            }
            finally
            {
                this.RequestContext.CurrentDbSet = null;
            }
        }
        #endregion

        #region DataService Main Methods

        /// <summary>
        /// Utility method to obtain data from the dataservice's query method
        /// mainly used to embed data on page load, and fill classifiers for lookup data
        /// </summary>
        /// <param name="dbSetName"></param>
        /// <param name="queryName"></param>
        /// <returns></returns>
        public QueryResponse GetQueryData(string dbSetName, string queryName)
        {
            QueryRequest getInfo = new QueryRequest { dbSetName = dbSetName, queryName = queryName };
            return this.ServiceGetData(getInfo).Result;
        }

        protected async Task<QueryResponse> PerformQuery(QueryRequest queryInfo)
        {
            var metadata = MetadataHelper.EnsureMetadataInitialized(this);
            MethodDescription method = metadata.GetQueryMethod(queryInfo.queryName);
            var authorizer = this.ServiceContainer.Authorizer;
            authorizer.CheckUserRightsToExecute(method.methodInfo);
            queryInfo.dbSetInfo = metadata.dbSets[queryInfo.dbSetName];
            bool isMultyPageRequest = queryInfo.dbSetInfo.enablePaging && queryInfo.pageCount > 1;
      
            QueryResult queryResult = null;
            int? totalCount = null;
            LinkedList<object> methParams = new LinkedList<object>();
          
            for (var i = 0; i < method.parameters.Count; ++i)
            {
                 methParams.AddLast(queryInfo.paramInfo.GetValue(method.parameters[i].name, method, this.ServiceContainer));
            }
            this.RequestContext.CurrentQueryInfo = queryInfo;
            try
            {
                var invokeRes = method.methodInfo.Invoke(this, methParams.ToArray());
                queryResult = (QueryResult)await ServiceOperationsHelper.GetMethodResult(invokeRes).ConfigureAwait(false);
            }
            finally
            {
                this.RequestContext.CurrentQueryInfo = null;
            }
    
            IEnumerable entities = (IEnumerable)queryResult.Result;
            totalCount = queryResult.TotalCount;
            int rowCnt = 0;
            LinkedList<object> entityList = new LinkedList<object>();
            foreach (object entity in entities)
            {
                entityList.AddLast(entity);
                ++rowCnt;
            }
            RowGenerator rowGenerator = new RowGenerator(queryInfo.dbSetInfo, entityList, this.ServiceContainer.DataHelper);
            var rows = rowGenerator.CreateRows(rowCnt);
            SubResultsGenerator subResultsGenerator = new SubResultsGenerator(this);
            IEnumerable<IncludedResult> subResults1 = subResultsGenerator.CreateIncludedResults(queryInfo.dbSetInfo, entityList, queryResult.includeNavigations);
            IncludedResultList subResults2 = subResultsGenerator.CreateIncludedResults(queryResult.subResults);

            var subResults = subResults1.Aggregate(subResults2, (lst, subRes) =>
            {
                if (lst.Any(r => r.dbSetName == subRes.dbSetName))
                    throw new DomainServiceException(string.Format("The included results already have {0} entities", subRes.dbSetName));
                lst.Add(subRes);
                return lst;
            });

            QueryResponse res = new QueryResponse()
            {
                pageIndex = queryInfo.pageIndex,
                pageCount = queryInfo.pageCount,
                dbSetName = queryInfo.dbSetName,
                names = queryInfo.dbSetInfo.GetNames(),
                totalCount = totalCount,
                extraInfo = queryResult.extraInfo,
                rows = rows,
                rowCount = rowCnt,
                fetchSize = queryInfo.dbSetInfo.FetchSize,
                included = subResults,
                error = null
            };
            return (QueryResponse)res;
        }

        protected async Task<bool> ApplyChangeSet(ChangeSet changeSet)
        {
            CachedMetadata metadata = MetadataHelper.EnsureMetadataInitialized(this);
            ChangeSetGraph graph = new ChangeSetGraph(changeSet, metadata);
            graph.Prepare();
           
            foreach (var rowInfo in graph.insertList)
            {
                this.RequestContext.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestContext.CurrentRowInfo = rowInfo;
                try
                {
                    rowInfo.changeState = new EntityChangeState { ParentRows= graph.GetParents(rowInfo) };
                    this.ApplyChangesToEntity(rowInfo);
                }
                finally
                {
                    this.RequestContext.CurrentRowInfo = null;
                    this.RequestContext.CurrentDbSet = null;
                }
            }

            foreach (var rowInfo in graph.updateList)
            {
                this.RequestContext.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestContext.CurrentRowInfo = rowInfo;
                try
                {
                    rowInfo.changeState = new EntityChangeState();
                    this.ApplyChangesToEntity(rowInfo);
                }
                finally
                {
                    this.RequestContext.CurrentRowInfo = null;
                    this.RequestContext.CurrentDbSet = null;
                }
            }

            foreach (var rowInfo in graph.deleteList)
            {
                this.RequestContext.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestContext.CurrentRowInfo = rowInfo;
                try
                {
                    rowInfo.changeState = new EntityChangeState();
                    this.ApplyChangesToEntity(rowInfo);
                }
                finally
                {
                    this.RequestContext.CurrentRowInfo = null;
                    this.RequestContext.CurrentDbSet = null;
                }
            }
            
            bool hasErrors = false;
         
            //Validation step
            foreach (var rowInfo in graph.insertList)
            {
                this.RequestContext.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestContext.CurrentRowInfo = rowInfo; 
                try
                {
                    if (!(await this._helper.ValidateEntity(rowInfo).ConfigureAwait(false)))
                    {
                        rowInfo.invalid = rowInfo.changeState.ValidationErrors;
                        hasErrors = true;
                    }
                }
                finally
                {
                    this.RequestContext.CurrentRowInfo = null;
                    this.RequestContext.CurrentDbSet = null;
                }
            }

            //Validation step
            foreach (var rowInfo in graph.updateList)
            {
                this.RequestContext.CurrentDbSet = changeSet.dbSets.Where(d => d.dbSetName == rowInfo.dbSetInfo.dbSetName).Single();
                this.RequestContext.CurrentRowInfo = rowInfo; 
                try
                {
                    if (!(await this._helper.ValidateEntity(rowInfo).ConfigureAwait(false)))
                    {
                        rowInfo.invalid = rowInfo.changeState.ValidationErrors;
                        hasErrors = true;
                    }
                }
                finally
                {
                    this.RequestContext.CurrentRowInfo = null;
                    this.RequestContext.CurrentDbSet = null;
                }
            }

            if (hasErrors)
                return false;

            await this.ExecuteChangeSet().ConfigureAwait(false);

            foreach (var rowInfo in graph.allList)
            {
                if (rowInfo.changeType != ChangeType.Deleted)
                    this._helper.UpdateRowInfoAfterUpdates(rowInfo);
                else
                    rowInfo.values = null;
            }

     
            //Track changes step
            foreach (var rowInfo in graph.allList)
            {
                this.TrackChangesToEntity(rowInfo);
            }

            //OK, All updates are commited
            return true;
        }

        protected async Task<InvokeResponse> InvokeMethod(InvokeRequest invokeInfo) {
            var metadata = MetadataHelper.EnsureMetadataInitialized(this);
            MethodDescription method = metadata.GetInvokeMethod(invokeInfo.methodName);
            var authorizer = this.ServiceContainer.Authorizer;
            authorizer.CheckUserRightsToExecute(method.methodInfo);
            List<object> methParams = new List<object>();
            for (var i = 0; i < method.parameters.Count; ++i) {
               methParams.Add(invokeInfo.paramInfo.GetValue(method.parameters[i].name, method, this.ServiceContainer));
            }
             
            var invokeRes = method.methodInfo.Invoke(this, methParams.ToArray());
            object meth_result = await ServiceOperationsHelper.GetMethodResult(invokeRes).ConfigureAwait(false);
            InvokeResponse res = new InvokeResponse();
            if (method.methodResult)
                res.result = meth_result;
            return res;
        }

        protected async Task<RefreshInfo> RefreshRowInfo(RefreshInfo info)
        {
            var metadata = MetadataHelper.EnsureMetadataInitialized(this);
            info.dbSetInfo = metadata.dbSets[info.dbSetName];
            MethodInfo methInfo = info.dbSetInfo.getOperationMethodInfo(MethodType.Refresh);
            if (methInfo == null)
                throw new InvalidOperationException(string.Format(ErrorStrings.ERR_REC_REFRESH_INVALID, info.dbSetInfo.EntityType.Name, this.GetType().Name));
            info.rowInfo.dbSetInfo = info.dbSetInfo;
            var authorizer = this.ServiceContainer.Authorizer;
            authorizer.CheckUserRightsToExecute(methInfo);

            object dbEntity = null;
            var invokeRes = methInfo.Invoke(this, new object[] { info });
            dbEntity = await ServiceOperationsHelper.GetMethodResult(invokeRes).ConfigureAwait(false);

            var rri = new RefreshInfo { rowInfo = info.rowInfo, dbSetName = info.dbSetName };
            if (dbEntity != null)
            {
                this._helper.UpdateRowInfoFromEntity(dbEntity, info.rowInfo);
            }
            else
                rri.rowInfo = null;

            return rri; 
        }
        #endregion

        #region IDomainService Methods
        public string ServiceGetTypeScript(string comment = null)
        {
            if (!this.IsCodeGenEnabled)
                throw new InvalidOperationException(string.Format(ErrorStrings.ERR_CODEGEN_DISABLED,MethodInfo.GetCurrentMethod().Name, this.GetType().Name));
            return this.GetTypeScript(comment);
        }

        public string ServiceGetXAML(bool isDraft = true)
        {
            if (!this.IsCodeGenEnabled)
                throw new InvalidOperationException(string.Format(ErrorStrings.ERR_CODEGEN_DISABLED, MethodInfo.GetCurrentMethod().Name, this.GetType().Name));
            Metadata metadata = null;
            MetadataHelper.ExecuteOnSTA((object state) =>
            {
                metadata = this.GetMetadata(isDraft);
            }, this);
            return metadata.ToXML();
        }

        public string ServiceGetCSharp()
        {
            if (!this.IsCodeGenEnabled)
                throw new InvalidOperationException(string.Format(ErrorStrings.ERR_CODEGEN_DISABLED, MethodInfo.GetCurrentMethod().Name, this.GetType().Name));
            return this.GetCSharp();
        }

        public Permissions ServiceGetPermissions()
        {
            try
            {
                CachedMetadata metadata = MetadataHelper.EnsureMetadataInitialized(this);
                Permissions result = new Permissions();
                result.serverTimezone = RIAPP.DataService.Utils.DataHelper.GetLocalDateTimezoneOffset(DateTime.Now);
                var authorizer = this.ServiceContainer.Authorizer;
                foreach (var dbInfo in metadata.dbSets.Values)
                {

                    var permissions = dbInfo.CalculatePermissions(authorizer);
                    result.permissions.Add(permissions);
                }
             
                return result;
            }
            catch (Exception ex)
            {
                this.OnError(ex);
                throw;
            }
        }

        public MetadataResult ServiceGetMetadata()
        {
            try
            {
                CachedMetadata metadata = MetadataHelper.EnsureMetadataInitialized(this);
                var result = new MetadataResult();
                result.methods = metadata.methodDescriptions;
                result.associations.AddRange(metadata.associations.Values);
                result.dbSets.AddRange(metadata.dbSets.Values);
                return result;
            }
            catch (Exception ex)
            {
                this.OnError(ex);
                throw;
            }
        }

        public async Task<QueryResponse> ServiceGetData(QueryRequest queryRequest)
        {
            QueryResponse res = null;
            this.RequestContext.CurrentOperation = ServiceOperationType.Query;
            try
            {
                res = await this.PerformQuery(queryRequest);
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null)
                    ex = ex.InnerException;
                res = new QueryResponse() { pageIndex = queryRequest.pageIndex, pageCount = queryRequest.pageCount,
                    rows = new Row[0], 
                    dbSetName = queryRequest.dbSetName, totalCount = null, error = new ErrorInfo(ex.Message, ex.GetType().Name) };
                this.OnError(ex);
            }
            finally
            {
                this.RequestContext.CurrentOperation = ServiceOperationType.None;
            }
            return res;
        }

        public async Task<ChangeSet> ServiceApplyChangeSet(ChangeSet changeSet)
        {
            bool res = true;
            this.RequestContext.CurrentOperation = ServiceOperationType.SaveChanges;
            this.RequestContext.CurrentChangeSet = changeSet;
            try
            {
                this.AuthorizeChangeSet(changeSet);
                res = await this.ApplyChangeSet(changeSet);
                if (!res) {
                    throw new ValidationException(ErrorStrings.ERR_SVC_CHANGES_ARENOT_VALID);
                }
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null)
                    ex = ex.InnerException;
                changeSet.error = new ErrorInfo(ex.Message, ex.GetType().Name);
                this.OnError(ex);
            }
            finally
            {
                this.RequestContext.CurrentOperation = ServiceOperationType.None;
                this.RequestContext.CurrentChangeSet = null;
            }
            return changeSet;
        }

        public async Task<RefreshInfo> ServiceRefreshRow(RefreshInfo refreshInfo)
        {
            RefreshInfo res = null;
            this.RequestContext.CurrentOperation = ServiceOperationType.RowRefresh;
            try
            {
                res = await this.RefreshRowInfo(refreshInfo);
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null)
                    ex = ex.InnerException;
                res = new RefreshInfo { dbSetName = refreshInfo.dbSetName, error = new ErrorInfo(ex.Message, ex.GetType().Name), rowInfo = null };
                this.OnError(ex);
            }
            finally
            {
                this.RequestContext.CurrentOperation = ServiceOperationType.None;
            }
            return res;
        }

        public async Task<InvokeResponse> ServiceInvokeMethod(InvokeRequest parameters) {
            InvokeResponse res = null;
            this.RequestContext.CurrentOperation = ServiceOperationType.InvokeMethod;
            try
            {
                res = await this.InvokeMethod(parameters);
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null)
                    ex = ex.InnerException;
                res = new InvokeResponse() { result= null , error = new ErrorInfo(ex.Message, ex.GetType().Name) };
                this.OnError(ex);
            }
            finally
            {
                this.RequestContext.CurrentOperation = ServiceOperationType.None;
            }
            return res;
        }
        #endregion

        #region IDisposable Members
        protected virtual void Dispose(bool isDisposing)
        {
           this._requestContext = null;
           this._serviceContainer = null;
           this._helper = null;
        }

        void IDisposable.Dispose()
        {
            this.Dispose(true);
        }

        #endregion
    }
}

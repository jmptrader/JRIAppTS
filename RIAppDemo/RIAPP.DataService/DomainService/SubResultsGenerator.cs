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
    internal class SubResultsGenerator
    {
        private BaseDomainService _domainService;
        private IDataHelper _dataHelper;

        public SubResultsGenerator(BaseDomainService domainService)
        {
            this._domainService = domainService;
            this._dataHelper = this._domainService.ServiceContainer.DataHelper;
        }

        public IEnumerable<IncludedResult> CreateIncludedResults(DbSetInfo dbSetInfo, IEnumerable<object> entities, string[] includePaths)
        {
            if (includePaths.Length == 0)
                return Enumerable.Empty<IncludedResult>();
            Dictionary<string, IncludedResult> visited = new Dictionary<string, IncludedResult>();
            var metadata = MetadataHelper.EnsureMetadataInitialized(this._domainService);
            foreach (string includePath in includePaths)
            {
                string[] pathParts = includePath.Split('.');
                string[] nextParts = pathParts.Skip(1).ToArray();
                this.CreateIncludedResult(dbSetInfo, entities, pathParts[0], nextParts, visited);
            }
            return visited.Values;
        }

        public IncludedResultList CreateIncludedResults(IEnumerable<SubResult> subResults)
        {
            IncludedResultList result = new IncludedResultList();
            if (subResults == null)
                return result;
            var metadata = MetadataHelper.EnsureMetadataInitialized(this._domainService);
            int rowCount = 0;
            foreach (SubResult subResult in subResults)
            {
                var dbSetInfo = metadata.dbSets[subResult.dbSetName];
                if (result.Any(r => r.dbSetName == subResult.dbSetName))
                    throw new DomainServiceException(string.Format("The included results already have {0} entities", dbSetInfo.dbSetName));
                LinkedList<object> entityList = new LinkedList<object>();
                foreach (object entity in subResult.Result)
                {
                    entityList.AddLast(entity);
                    ++rowCount;
                }
                RowGenerator rowGenerator = new RowGenerator(dbSetInfo, entityList, this._dataHelper);
                IncludedResult current = new IncludedResult { dbSetName = dbSetInfo.dbSetName, rows = rowGenerator.CreateDistinctRows(ref rowCount), names = dbSetInfo.GetNames() };
                current.rowCount = rowCount;
                result.Add(current);
            }
            return result;
        }

        private void CreateIncludedResult(DbSetInfo dbSetInfo, IEnumerable<object> inputEntities, string propertyName, string[] nextParts, Dictionary<string, IncludedResult> visited)
        {
            var metadata = MetadataHelper.EnsureMetadataInitialized(this._domainService);
            bool isChildProperty = false;
            DbSetInfo nextDbSetInfo = null;
            var assoc = metadata.associations.Values.Where(a => a.parentDbSetName == dbSetInfo.dbSetName && a.parentToChildrenName == propertyName).FirstOrDefault();
            if (assoc != null)
            {
                isChildProperty = true;
                nextDbSetInfo = metadata.dbSets[assoc.childDbSetName];
            }
            else
            {
                assoc = metadata.associations.Values.Where(a => a.childDbSetName == dbSetInfo.dbSetName && a.childToParentName == propertyName).FirstOrDefault();
                if (assoc == null)
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_INCL_NAVIG_INVALID, propertyName + (nextParts.Length > 0 ? ("." + string.Join(".", nextParts)) : "")));
                }

                nextDbSetInfo = metadata.dbSets[assoc.parentDbSetName];
            }
            if (visited.ContainsKey(nextDbSetInfo.dbSetName + "." + propertyName))
                return;

            int rowCount = 0;
            object propValue;
            LinkedList<object> resultEntities = new LinkedList<object>();
            foreach (object entity in inputEntities)
            {
                propValue = this._dataHelper.GetValue(entity, propertyName, true);
                if (isChildProperty && propValue is IEnumerable)
                {
                    foreach (object childEntity in (IEnumerable)propValue)
                    {
                        resultEntities.AddLast(childEntity);
                        ++rowCount;
                    }
                }
                else if (!isChildProperty && propValue != null)
                {
                    resultEntities.AddLast(propValue);
                    ++rowCount;
                }
            }

            //create temporary result without rows
            //fills rows at the end of the method
            IncludedResult current = new IncludedResult { dbSetName = nextDbSetInfo.dbSetName, rows = new Row[0], names = nextDbSetInfo.GetNames() };
            visited.Add(nextDbSetInfo.dbSetName + "." + propertyName, current);
            if (nextParts.Length > 0)
                this.CreateIncludedResult(nextDbSetInfo, resultEntities, nextParts[0], nextParts.Skip(1).ToArray(), visited);
            RowGenerator rowGenerator = new RowGenerator(nextDbSetInfo, resultEntities, this._dataHelper);
            current.rows = rowGenerator.CreateDistinctRows(ref rowCount);
            current.rowCount = rowCount;
        }
    }

}

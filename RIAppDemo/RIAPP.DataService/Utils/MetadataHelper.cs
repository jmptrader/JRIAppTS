using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using StaThreadSyncronizer;
using RIAPP.DataService.Types;
using System.Reflection;
using RIAPP.DataService.Resources;



namespace RIAPP.DataService.Utils
{
    public static class MetadataHelper
    {
        private static StaSynchronizationContext _synchronizer = new StaSynchronizationContext();
        private static MetadataCache _metadataCache = new MetadataCache();

        public static CachedMetadata EnsureMetadataInitialized(BaseDomainService domainService)
        {
            CachedMetadata cachedMetadata = null;
            Func<CachedMetadata> factory = () => {
                Type thisType = domainService.GetType();
                CachedMetadata result = null;
                if (MetadataHelper._metadataCache.TryGetValue(thisType, out result))
                    return result;
                MetadataHelper.ExecuteOnSTA((state) => { MetadataHelper.InitMetadata((BaseDomainService)state); }, domainService);
                MetadataHelper._metadataCache.TryGetValue(thisType, out result);
                return result;
            };
            System.Threading.LazyInitializer.EnsureInitialized<CachedMetadata>(ref cachedMetadata, factory);
            return cachedMetadata;
        }

        public static void ExecuteOnSTA(System.Threading.SendOrPostCallback action, object state)
        {
            _synchronizer.Send(action, state);
        }

        private static void InitMetadata(BaseDomainService domainService)
        {
            Type thisType = domainService.GetType();
            CachedMetadata cachedMetadata = null;
            if (MetadataHelper._metadataCache.TryGetValue(thisType, out cachedMetadata))
            {
                return;
            }
            try
            {
                cachedMetadata = CreateCachedMetadata(domainService);
            }
            catch(Exception ex)
            {
                domainService.OnError(ex);
                throw;
            }
            MetadataHelper._metadataCache.TryAdd(thisType, cachedMetadata);
        }

        private static CachedMetadata CreateCachedMetadata(BaseDomainService domainService)
        {
            Metadata metadata = domainService.GetMetadata(false);
            CachedMetadata cachedMetadata = new CachedMetadata();
            foreach (var dbSetInfo in metadata.DbSets)
            {
                dbSetInfo.Initialize(domainService.ServiceContainer);
                //indexed by dbSetName
                cachedMetadata.dbSets.Add(dbSetInfo.dbSetName, dbSetInfo);
            }

            MetadataHelper.ProcessMethodDescriptions(domainService, cachedMetadata);
            MetadataHelper.CheckDataServiceMethods(domainService, cachedMetadata);

            foreach (var assoc in metadata.Associations)
            {
                if (string.IsNullOrWhiteSpace(assoc.name))
                {
                    throw new DomainServiceException(ErrorStrings.ERR_ASSOC_EMPTY_NAME);
                }
                if (!cachedMetadata.dbSets.ContainsKey(assoc.parentDbSetName))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_PARENT, assoc.name, assoc.parentDbSetName));
                }
                if (!cachedMetadata.dbSets.ContainsKey(assoc.childDbSetName))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_CHILD, assoc.name, assoc.childDbSetName));
                }
                var childDb = cachedMetadata.dbSets[assoc.childDbSetName];
                var parentDb = cachedMetadata.dbSets[assoc.parentDbSetName];
                var parentDbFields = parentDb.GetFieldByNames();
                var childDbFields = childDb.GetFieldByNames();

                //check navigation field
                //dont allow to define  it explicitly, the association adds the field by itself (implicitly)
                if (!string.IsNullOrEmpty(assoc.childToParentName) && childDbFields.ContainsKey(assoc.childToParentName))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_NAV_FIELD, assoc.name, assoc.childToParentName));
                }

                //check navigation field
                //dont allow to define  it explicitly, the association adds the field by itself (implicitly)
                if (!string.IsNullOrEmpty(assoc.parentToChildrenName) && parentDbFields.ContainsKey(assoc.parentToChildrenName))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_NAV_FIELD, assoc.name, assoc.parentToChildrenName));
                }

                if (!string.IsNullOrEmpty(assoc.parentToChildrenName) && !string.IsNullOrEmpty(assoc.childToParentName) && assoc.childToParentName == assoc.parentToChildrenName)
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_NAV_FIELD, assoc.name, assoc.parentToChildrenName));
                }

                foreach (var frel in assoc.fieldRels)
                {
                    if (!parentDbFields.ContainsKey(frel.parentField))
                    {
                        throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_PARENT_FIELD, assoc.name, frel.parentField));
                    }
                    if (!childDbFields.ContainsKey(frel.childField))
                    {
                        throw new DomainServiceException(string.Format(ErrorStrings.ERR_ASSOC_INVALID_CHILD_FIELD, assoc.name, frel.childField));
                    }
                }
                //indexed by Name
                cachedMetadata.associations.Add(assoc.name, assoc);

                if (!string.IsNullOrEmpty(assoc.childToParentName))
                {
                    var sb = new System.Text.StringBuilder(120);
                    var dependentOn = assoc.fieldRels.Aggregate(sb, (a, b) => a.Append((a.Length == 0 ? "" : ",") + b.childField), a => a).ToString();
                    //add navigation field to dbSet's field collection
                    childDb.fieldInfos.Add(new Field()
                    {
                        fieldName = assoc.childToParentName,
                        fieldType = FieldType.Navigation,
                        dataType = DataType.None,
                        dependentOn = dependentOn,
                        _TypeScriptDataType = TypeScriptHelper.GetEntityTypeName(parentDb.dbSetName)
                    });
                }

                if (!string.IsNullOrEmpty(assoc.parentToChildrenName))
                {
                    var sb = new System.Text.StringBuilder(120);
                    //add navigation field to dbSet's field collection
                    parentDb.fieldInfos.Add(new Field()
                    {
                        fieldName = assoc.parentToChildrenName,
                        fieldType = FieldType.Navigation,
                        dataType = DataType.None,
                        _TypeScriptDataType = string.Format("{0}[]", TypeScriptHelper.GetEntityTypeName(childDb.dbSetName))
                    });
                }
            } //foreach (var assoc in metadata.Associations)

            return cachedMetadata;
        }

        public static void CheckMethod(BaseDomainService domainService, DbSetInfo dbSetInfo, MethodType methodType)
        {
            Type thisType = domainService.GetType();
            string methodName = dbSetInfo.getOperationMethodName(methodType);
            if (string.IsNullOrWhiteSpace(methodName))
                return;
            MethodInfo minfo = DataHelper.GetMethodInfo(thisType, methodName);
            if (minfo != null)
            {
                switch (methodType)
                {
                    case MethodType.Refresh:
                        dbSetInfo._refreshDataMethod = minfo;
                        break;
                    case MethodType.Insert:
                        dbSetInfo._insertDataMethod = minfo;
                        break;
                    case MethodType.Update:
                        dbSetInfo._updateDataMethod = minfo;
                        break;
                    case MethodType.Delete:
                        dbSetInfo._deleteDataMethod = minfo;
                        break;
                    case MethodType.Validate:
                        dbSetInfo._validateDataMethod = minfo;
                        break;
                    default:
                        throw new DomainServiceException(string.Format("Invalid Method Type {0}", methodType));
                }
            }
            else
            {
                throw new DomainServiceException(string.Format("The DataService: {0} has no method: {2} specified for DbSet: {1} and operation: {3}", thisType.Name, dbSetInfo.dbSetName, methodName, Enum.GetName(typeof(MethodType), methodType)));
            }
        }

        private static void CheckDataServiceMethods(BaseDomainService domainService, CachedMetadata metadata)
        {
            StringBuilder sb = new StringBuilder();

            foreach (var dbSet in metadata.dbSets.Values)
            {
                try
                {
                    MetadataHelper.CheckMethod(domainService, dbSet, MethodType.Insert);
                    MetadataHelper.CheckMethod(domainService, dbSet, MethodType.Update);
                    MetadataHelper.CheckMethod(domainService, dbSet, MethodType.Delete);
                    MetadataHelper.CheckMethod(domainService, dbSet, MethodType.Validate);
                    MetadataHelper.CheckMethod(domainService, dbSet, MethodType.Refresh);
                }
                catch (DomainServiceException ex)
                {
                    sb.AppendLine(ex.Message);
                }
            }
           
            if (sb.Length > 0)
                throw new DomainServiceException(sb.ToString());
        }

        /// <summary>
        /// Test if public methods on the service has Invoke or Query Attribute
        /// and generates from this methods their invocation method descriptions 
        /// </summary>
        /// <returns></returns>
        private static void ProcessMethodDescriptions(BaseDomainService domainService, CachedMetadata metadata)
        {
            Type thisType= domainService.GetType();
            IServiceContainer services = domainService.ServiceContainer;
            Func<MethodInfo, MethodType> fn_getMethodType = (m) =>
            {
                if (m.IsDefined(typeof(QueryAttribute), false))
                    return MethodType.Query;
                else if (m.IsDefined(typeof(InvokeAttribute), false))
                    return MethodType.Invoke;
                else if (m.IsDefined(typeof(InsertAttribute), false))
                    return MethodType.Insert;
                else if (m.IsDefined(typeof(UpdateAttribute), false))
                    return MethodType.Update;
                else if (m.IsDefined(typeof(DeleteAttribute), false))
                    return MethodType.Delete;
                else if (m.IsDefined(typeof(ValidateAttribute), false))
                    return MethodType.Validate;
                else if (m.IsDefined(typeof(RefreshAttribute), false))
                    return MethodType.Refresh;
                else
                    return MethodType.None;
            };
            var dbsetsLookUp = metadata.dbSets.Values.ToLookup(v => v.EntityType);
            var dbsetsByType = dbsetsLookUp.ToDictionary(v => v.Key);
            var methodInfos = thisType.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public);
            var allList = methodInfos.Select(m => new { method = m, methodType = fn_getMethodType(m) });
            var queryAndInvokes = allList.Where((info) => info.methodType == MethodType.Query || info.methodType == MethodType.Invoke).ToArray();
            MethodsList methodList = new MethodsList();
            Array.ForEach(queryAndInvokes, (info) =>
            {
                methodList.Add(MethodDescription.FromMethodInfo(info.method, info.methodType, services));
            });
            metadata.InitMethods(methodList);

            var otherMethods = allList.Where((info) => !(info.methodType == MethodType.Query || info.methodType == MethodType.Invoke || info.methodType == MethodType.None)).ToArray();

            Array.ForEach(otherMethods, (info) =>
            {
                Type entityType = null;
                if (info.methodType == MethodType.Refresh)
                {
                    entityType = RemoveTaskFromType(info.method.ReturnType);
                }
                else
                {
                    entityType = info.method.GetParameters().First().ParameterType;
                }

                IGrouping<Type, DbSetInfo> dbSets = null;
                if (!dbsetsByType.TryGetValue(entityType, out dbSets))
                    return;

                foreach (var dbSet in dbSets)
                {
                    switch (info.methodType)
                    {
                        case MethodType.Insert:
                            dbSet.insertDataMethod = info.method.Name;
                            break;
                        case MethodType.Update:
                            dbSet.updateDataMethod = info.method.Name;
                            break;
                        case MethodType.Delete:
                            dbSet.deleteDataMethod = info.method.Name;
                            break;
                        case MethodType.Validate:
                            dbSet.validateDataMethod = info.method.Name;
                            break;
                        case MethodType.Refresh:
                            dbSet.refreshDataMethod = info.method.Name;
                            break;
                        default:
                            throw new DomainServiceException(string.Format("Unknown Method Type: {0}", info.methodType));
                    }
                }
            });

        }

        /// <summary>
        /// if the type is Task<InnerType>
        /// the method return type of InnerType removing Task type
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static Type RemoveTaskFromType(Type type)
        {
            if (type.IsGenericType && typeof(Task).IsAssignableFrom(type))
            {
                return type.GetGenericArguments().First();
            }
            else
                return type;
        }
    }
}

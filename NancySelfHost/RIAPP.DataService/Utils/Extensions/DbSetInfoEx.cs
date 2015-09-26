using RIAPP.DataService.Resources;
using RIAPP.DataService.Security;
using RIAPP.DataService.Types;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;


namespace RIAPP.DataService.Utils
{
    public static class DbSetInfoEx
    {
        public static FieldName[] GetNames(this DbSetInfo dbSetInfo)
        {
            return dbSetInfo.GetInResultFields().Select(fi => new FieldName { n = fi.fieldName, p = (fi.fieldType == FieldType.Object) ? fi.GetNames() : null }).ToArray();
        }

        public static DbSetPermit CalculatePermissions(this DbSetInfo dbSetInfo, IAuthorizer authorizer)
        {
            return SecurityHelper.GetDbSetPermissions(dbSetInfo, authorizer);
        }

        public static MethodInfo getOperationMethodInfo(this DbSetInfo dbSetInfo, MethodType methodType)
        {
            switch (methodType)
            {
                case MethodType.Refresh:
                    return dbSetInfo._refreshDataMethod;
                case MethodType.Insert:
                    return dbSetInfo._insertDataMethod;
                case MethodType.Update:
                    return dbSetInfo._updateDataMethod;
                case MethodType.Delete:
                    return dbSetInfo._deleteDataMethod;
                case MethodType.Validate:
                    return dbSetInfo._validateDataMethod;
                default:
                    throw new DomainServiceException(string.Format("Invalid Method Type {0}", methodType));
            }
        }

        /// <summary>
        /// typically methods names use templated scheme like: insert{0} or delete{0}
        /// where {0} later is replaced by dbSet's name, that will turn into something like: insertCustomer or deleteCustomer 
        /// </summary>
        /// <param name="methodNameTemplate"></param>
        /// <param name="dbSetName"></param>
        /// <returns></returns>
        private static string GenerateMethodName(string methodNameTemplate, string dbSetName)
        {
            try
            {
                return string.Format(methodNameTemplate, dbSetName);
            }
            catch
            {
                //return as is
                return methodNameTemplate;
            }
        }

        public static string getOperationMethodName(this DbSetInfo dbSetInfo, MethodType methodType)
        {
            switch (methodType)
            {
                case MethodType.Refresh:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.refreshDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.refreshDataMethod, dbSetInfo.dbSetName);
                case MethodType.Insert:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.insertDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.insertDataMethod, dbSetInfo.dbSetName);
                case MethodType.Update:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.updateDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.updateDataMethod, dbSetInfo.dbSetName);
                case MethodType.Delete:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.deleteDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.deleteDataMethod, dbSetInfo.dbSetName);
                case MethodType.Validate:
                    if (string.IsNullOrWhiteSpace(dbSetInfo.validateDataMethod))
                        return null;
                    return GenerateMethodName(dbSetInfo.validateDataMethod, dbSetInfo.dbSetName);
                default:
                    throw new DomainServiceException(string.Format("Invalid Method Type {0}", methodType));
            }
        }

        public static Dictionary<string, Field> GetFieldByNames(this DbSetInfo dbSetInfo)
        {
            return dbSetInfo._fieldsByNames;
        }


        private static void SetOrdinal(Field[] fieldInfos)
        {
            int i = 0, cnt = fieldInfos.Length;
            for (i = 0; i < cnt; ++i)
            {
                fieldInfos[i]._ordinal = i;
                if (fieldInfos[i].fieldType == FieldType.Object)
                {
                    SetOrdinal(fieldInfos[i].nested.ToArray());
                }
            }
        }

        public static void Initialize(this DbSetInfo dbSetInfo, IServiceContainer services)
        {
            dbSetInfo._fieldsByNames = new Dictionary<string, Field>();
            int i = 0; 
            var fieldInfos = dbSetInfo.fieldInfos.ToArray();
            int cnt = fieldInfos.Length;

            for (i = 0; i < cnt; ++i)
            {
                services.DataHelper.ForEachFieldInfo("", fieldInfos[i], (fullName, fieldInfo) =>
                {
                    fieldInfo._FullName = fullName;
                    dbSetInfo._fieldsByNames.Add(fullName, fieldInfo);
                });
            }
            SetOrdinal(fieldInfos);
            var pkFields = dbSetInfo.GetPKFields();
            if (pkFields.Length < 1)
            {
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_DBSET_HAS_NO_PK, dbSetInfo.dbSetName));
            }
            var fbn = dbSetInfo.GetFieldByNames();
        }
    }
}

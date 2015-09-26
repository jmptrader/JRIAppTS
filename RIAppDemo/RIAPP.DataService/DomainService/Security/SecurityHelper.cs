using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using RIAPP.DataService;
using RIAPP.DataService.Resources;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Security
{
    public static class SecurityHelper
    {
        public const string AUTHENTICATED = "_mustbe_authenicated";
        public const string ALLOW_ANONYMOUS = "_allow_anonymous";

        public struct RolesForMethod
        {
            public string MethodName;
            public IEnumerable<string> Roles;
            public bool IsRolesOverride;
        }

        public static MethodInfo GetMethodInfo(Type type, string name)
        {
            MethodInfo meth = null;
            if (!string.IsNullOrEmpty(name))
                meth = type.GetMethod(name);
            return meth;
        }
        public static IEnumerable<RolesForMethod> GetRolesForMethods(IEnumerable<MethodInfo> methods)
        {
            RolesForMethod[] result= new RolesForMethod[methods.Count()];
            int i=0;
            foreach (MethodInfo methInfo in methods)
            {
                RolesForMethod method_roles = new RolesForMethod { MethodName = methInfo.Name, Roles = null, IsRolesOverride=false };
                var roles_list = new LinkedList<string>();

                //the override attribute replaces all other roles for the method
                var override_roles = methInfo.GetCustomAttribute<OverrideAuthorizeAttribute>(false);
                if (override_roles != null)
                {
                    method_roles.IsRolesOverride = true;
                    method_roles.Roles = override_roles.Roles.Select(a => a.Trim()).Distinct().ToArray();
                    result[i++] = method_roles;
                    continue;
                }

                var attrs = methInfo.GetCustomAttributes(typeof(AuthorizeAttribute), false).OfType<AuthorizeAttribute>();
                if (attrs.Count() == 0)
                {
                    //allow unauthenticated access
                    var passthrough_attrs = methInfo.GetCustomAttributes(typeof(AllowAnonymousAttribute), false).OfType<AllowAnonymousAttribute>();
                    if (passthrough_attrs.Count()> 0)
                        roles_list.AddLast(ALLOW_ANONYMOUS);
                }
                else
                {
                    //at least user must be authenticated
                    roles_list.AddLast(AUTHENTICATED);
                    foreach (var attr in attrs)
                    {
                        var attr_roles = attr.Roles.Select(a => a.Trim());
                        foreach (var role in attr_roles)
                            roles_list.AddLast(role);
                    }
                }
                method_roles.Roles = roles_list.Distinct().ToArray();
                result[i++] = method_roles;
            }

            return result;
        }
        public static IEnumerable<string> GetRolesForService(Type serviceType)
        {
            LinkedList<string> roles_list = new LinkedList<string>();
            var attrs = serviceType.GetCustomAttributes(typeof(AuthorizeAttribute), false).OfType<AuthorizeAttribute>();
            if (attrs.Count() > 0)
            {
                //at least user must be authenticated
                roles_list.AddLast(SecurityHelper.AUTHENTICATED);
            }

            foreach (var attr in attrs)
            {
                var attr_roles = attr.Roles.Select(a => a.Trim());
                foreach (var role in attr_roles)
                    roles_list.AddLast(role);
            }

            var distinct_roles = roles_list.Distinct();
            return distinct_roles;
        }
        public static MethodInfo GetCRUDMethodInfo(DbSetInfo dbInfo, RowInfo rowInfo)
        {
            MethodInfo methInfo = null;
            switch (rowInfo.changeType)
            {
                case ChangeType.Added:
                    methInfo = dbInfo.getOperationMethodInfo(MethodType.Insert);
                    break;
                case ChangeType.Deleted:
                    methInfo = dbInfo.getOperationMethodInfo(MethodType.Delete);
                    break;
                case ChangeType.Updated:
                    methInfo = dbInfo.getOperationMethodInfo(MethodType.Update);
                    break;
                default:
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbInfo.EntityType.Name, rowInfo.changeType));
            }
            return methInfo;
        }
        public static bool CanAccessMethod(MethodInfo methInfo, IAuthorizer authorizer)
        {
            try
            {
                authorizer.CheckUserRightsToExecute(methInfo);
                return true;
            }
            catch(AccessDeniedException)
            {
                return false;
            }
        }

        public static DbSetPermit GetDbSetPermissions(DbSetInfo dbInfo, IAuthorizer authorizer)
        {
            MethodInfo methInfo = null;
            DbSetPermit permit = new DbSetPermit();
            permit.dbSetName = dbInfo.dbSetName;
            methInfo = dbInfo.getOperationMethodInfo(MethodType.Insert);
            permit.canAddRow = methInfo != null && CanAccessMethod(methInfo,authorizer);

            methInfo = dbInfo.getOperationMethodInfo(MethodType.Update);
            permit.canEditRow = methInfo != null && CanAccessMethod(methInfo, authorizer);

            methInfo = dbInfo.getOperationMethodInfo(MethodType.Delete);
            permit.canDeleteRow = methInfo != null && CanAccessMethod(methInfo, authorizer);

            methInfo = dbInfo.getOperationMethodInfo(MethodType.Refresh);
            permit.canRefreshRow = methInfo != null && CanAccessMethod(methInfo, authorizer);
            return permit;
        }
    }
}

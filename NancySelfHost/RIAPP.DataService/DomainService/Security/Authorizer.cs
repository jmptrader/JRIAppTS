using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Principal;
using System.Reflection;
using RIAPP.DataService;
using RIAPP.DataService.Resources;


namespace RIAPP.DataService.Security
{
    public class AuthorizerClass : IAuthorizer
    {
        private const string ANONYMOUS_USER = "Anonymous";
        private Type _serviceType = null;
        private IEnumerable<string> _serviceRoles = null;
        private IPrincipal _principal;

        public AuthorizerClass(Type serviceType, IPrincipal principal)
        {
            this._serviceType = serviceType;
            if (principal == null)
            {
                IIdentity identity = new GenericIdentity(string.Empty);
                IPrincipal unauthentcated = new GenericPrincipal(identity, new string[0]);
                this._principal = unauthentcated;
            }
            else
                this._principal = principal;
        }


        private bool CheckAccessCore(IEnumerable<string> roles)
        {
            if (this.principal == null)
                return false;
            if (roles == null || !roles.Any())
                return true;
            if ((!this.principal.Identity.IsAuthenticated && roles.Contains(SecurityHelper.AUTHENTICATED, StringComparer.Ordinal)))
                return false;
            var filteredRoles = roles.Where(r => !r.Equals(SecurityHelper.AUTHENTICATED, StringComparison.Ordinal));
            if (!filteredRoles.Any())
                return true;
            foreach (string role in filteredRoles)
            {
                if (this.principal.IsInRole(role))
                {
                    return true;
                }
            }
            return false;
        }

        private bool CheckAccess(IEnumerable<SecurityHelper.RolesForMethod> requiredRoles)
        {
            bool result = true;
            foreach (var rolesForMethod in requiredRoles)
            {
                bool allowAnonymous = rolesForMethod.Roles.Any(r => r.Equals(SecurityHelper.ALLOW_ANONYMOUS, StringComparison.Ordinal));
                if (allowAnonymous)
                {
                    continue;
                }

                if (this.principal == null)
                {
                    result = false;
                    break;
                }

                //if not the method overrides roles for the service
                if (!rolesForMethod.IsRolesOverride)
                {
                    //first check roles assigned to the service as a whole
                    var svc_roles = this.GetRolesForService();
                    if (!this.CheckAccessCore(svc_roles))
                    {
                        result = false;
                        break;
                    }
                }

                //check the roles assigned for the method
                var meth_roles = rolesForMethod.Roles.Where(r => !r.Equals(SecurityHelper.ALLOW_ANONYMOUS, StringComparison.Ordinal));
                if (!this.CheckAccessCore(meth_roles))
                {
                    result = false;
                    break;
                }
            }
            return result;
        }

        private IEnumerable<string> GetRolesForService()
        {
            if (this._serviceRoles != null)
                return this._serviceRoles;
            this._serviceRoles = SecurityHelper.GetRolesForService(this._serviceType);
            return this._serviceRoles;
        }
     
        /// <summary>
        /// throws AccesDeniedExeption if user have no rights to execute operation
        /// </summary>
        /// <param name="changeSet"></param>
        public void CheckUserRightsToExecute(IEnumerable<MethodInfo> methods)
        {
            IEnumerable<SecurityHelper.RolesForMethod> roles = SecurityHelper.GetRolesForMethods(methods);

            if (!this.CheckAccess(roles))
            {
                string user = (this.principal == null || this.principal.Identity == null || !this.principal.Identity.IsAuthenticated) ? ANONYMOUS_USER : this.principal.Identity.Name;
                throw new AccessDeniedException(string.Format(ErrorStrings.ERR_USER_ACCESS_DENIED, user));
            }
        }

        /// <summary>
        /// throws AccesDeniedExeption if user have no rights to execute operation
        /// </summary>
        /// <param name="changeSet"></param>
        public void CheckUserRightsToExecute(MethodInfo method)
        {
            var roles = SecurityHelper.GetRolesForMethods(new MethodInfo[] { method });

            if (!CheckAccess(roles))
            {
                string user = (this.principal == null || this.principal.Identity == null || !this.principal.Identity.IsAuthenticated) ? ANONYMOUS_USER : this.principal.Identity.Name;
                throw new AccessDeniedException(string.Format(ErrorStrings.ERR_USER_ACCESS_DENIED,user));
            }
        }

        public IPrincipal principal
        {
            get
            {
                return this._principal;
            }
        }

        public Type serviceType
        {
            get
            {
                return this._serviceType;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Reflection;
using RIAPP.DataService;

namespace RIAPP.DataService.Security
{
    public interface IAuthorizer
    {
        void CheckUserRightsToExecute(IEnumerable<MethodInfo> methods);
        void CheckUserRightsToExecute(MethodInfo method);
        System.Security.Principal.IPrincipal principal { get; }
        Type serviceType { get; }
    }
}

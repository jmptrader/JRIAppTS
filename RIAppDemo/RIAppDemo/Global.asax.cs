using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Security.Principal;
using System.Threading;

namespace RIAppDemo
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            bool isNoRoles = false;
            IIdentity identity = new GenericIdentity("DUMMY_USER", "form");
            IPrincipal dummyUser = new GenericPrincipal(identity, isNoRoles?new string[0]:new string[] { "Users", "Admins" });
            HttpContext.Current.User = Thread.CurrentPrincipal = dummyUser;
        }
    }
}
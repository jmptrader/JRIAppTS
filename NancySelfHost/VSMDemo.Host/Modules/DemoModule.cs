using Nancy;
using Nancy.Responses;
using System.IO;
using System;
using System.Security.Principal;
using System.Linq;
using Nancy.Security;

namespace VSMDemo.Web
{
	public class DemoModule : NancyModule
	{
        public DemoModule()
            : base("/demo")
		{
            this.RequiresAuthentication();

            Get["/datagrid"] = x => {
                dynamic model = new DynamicDictionary();
                model.Title = "DataGrid Demo";
                model.siteBase = this.Context.Request.Url.SiteBase;
                return View["DataGridDemo.html", model]; 
            };
		}
	}
}

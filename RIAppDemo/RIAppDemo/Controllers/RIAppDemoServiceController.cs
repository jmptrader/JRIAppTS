using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RIAPP.DataService;
using RIAPP.DataService.Mvc;
using RIAppDemo.BLL;
using RIAppDemo.BLL.DataServices;
using System.Web.SessionState;
using System.Security.Principal;

namespace RIAppDemo.Controllers
{
    [SessionState(SessionStateBehavior.Disabled)]
    public class RIAppDemoServiceController : DataServiceController<RIAppDemoService>
    {
        [ChildActionOnly]
        public string ProductModelData()
        {
            var info = this.GetDomainService().GetQueryData("ProductModel", "ReadProductModel");
            return this.Serializer.Serialize(info);
        }

        [ChildActionOnly]
        public string ProductCategoryData()
        {
            var info = this.GetDomainService().GetQueryData("ProductCategory", "ReadProductCategory");
            return this.Serializer.Serialize(info);
        }

      
    }
}

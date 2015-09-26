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

namespace RIAppDemo.Controllers
{
    [SessionState(SessionStateBehavior.Disabled)]
    public class FolderBrowserServiceController : DataServiceController<FolderBrowserService>
    {
        
    }
}

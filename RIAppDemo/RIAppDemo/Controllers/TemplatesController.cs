using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.SessionState;
using RIAppDemo.BLL.DataServices;


namespace RIAppDemo.Controllers
{
    [SessionState(SessionStateBehavior.Disabled)]
    public class TemplatesController : Controller
    {
        public ActionResult Download(string name)
        {
            return View(name);
        }

        public ActionResult SPADemoTemplate1()
        {
            return View(new RIAppDemo.Models.SPATemplate());
        }

        public ActionResult SPADemoTemplate2()
        {
            return View(new RIAppDemo.Models.SPATemplate());
        }

        public ActionResult SPADemoTemplate3()
        {
            return View(new RIAppDemo.Models.SPATemplate());
        }

    }
}

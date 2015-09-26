using System;
using System.Web.Mvc;
using System.Web.SessionState;
using System.Linq;

namespace RIAppDemo.Controllers
{
    //[SessionState(SessionStateBehavior.Required)]
    public class DemoController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DataGridDemo()
        {
            return View();
        }

        public ActionResult ManyToManyDemo()
        {
            return View();
        }

        public ActionResult MasterDetailDemo()
        {
            return View(new RIAppDemo.Models.MasterDetailDemo());
        }

        public ActionResult CollectionsDemo()
        {
            return View();
        }

        public ActionResult BindingsDemo()
        {
            return View();
        }

        public ActionResult BrowserDemo()
        {
            return View();
        }

        public ActionResult SPADemo()
        {
            return View();
        }
    }
}

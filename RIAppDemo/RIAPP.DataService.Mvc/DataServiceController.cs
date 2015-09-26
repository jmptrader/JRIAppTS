using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using RIAPP.DataService;
using RIAPP.DataService.Utils;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;
using System.Threading.Tasks;

namespace RIAPP.DataService.Mvc
{
    public abstract class DataServiceController<T> : Controller
         where T : BaseDomainService
    {
        private ISerializer _serializer;
        private Lazy<IDomainService> _DomainService;

        [ActionName("typescript")]
        [HttpGet]
        public ActionResult GetTypeScript()
        {
            string comment = string.Format("\tGenerated from: {0} on {1:yyyy-MM-dd} at {1:HH:mm}\r\n\tDon't make manual changes here, because they will be lost when this db interface will be regenerated!", this.ControllerContext.HttpContext.Request.RawUrl, DateTime.Now);
            var info = this.DomainService.ServiceGetTypeScript(comment);
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        [ActionName("xaml")]
        [HttpGet]
        public ActionResult GetXAML(bool isDraft=true)
        {
            var info = this.DomainService.ServiceGetXAML(isDraft);
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        [ActionName("csharp")]
        [HttpGet]
        public ActionResult GetCSharp()
        {
            var info = this.DomainService.ServiceGetCSharp();
            var res = new ContentResult();
            res.ContentEncoding = System.Text.Encoding.UTF8;
            res.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        public DataServiceController()
        {
            this._serializer = new Serializer();
            this._DomainService = new Lazy<IDomainService>(() => this.CreateDomainService(),true);
        }

        protected virtual IDomainService CreateDomainService()
        {
            ServiceArgs args = new ServiceArgs(this._serializer, this.User);
            var service = (IDomainService)Activator.CreateInstance(typeof(T), args);
            return service;
        }

        [ChildActionOnly]
        public string PermissionsInfo()
        {
            var info = this.DomainService.ServiceGetPermissions();
            return this.Serializer.Serialize(info);
        }

        [ActionName("code")]
        [HttpGet]
        public ActionResult GetCode(string lang)
        {
            if (lang != null)
            {
                switch (lang.ToLowerInvariant())
                {
                    case "ts":
                    case "typescript":
                        return this.GetTypeScript();
                    case "xaml":
                        return this.GetXAML();
                    case "csharp":
                        return this.GetCSharp();
                    default:
                        throw new Exception(string.Format("Unknown lang argument: {0}", lang));
                }
            }
            else
                return this.GetTypeScript();
        }

        [ActionName("permissions")]
        [HttpGet]
        public ActionResult GetPermissions()
        {
            var res = this.DomainService.ServiceGetPermissions();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [ActionName("query")]
        [HttpPost]
        public async Task<ActionResult> PerformQuery([SericeParamsBinder] QueryRequest request)
        {
            return new IncrementalResult(await this.DomainService.ServiceGetData(request).ConfigureAwait(false), this.Serializer);
        }

        [ActionName("save")]
        [HttpPost]
        public async Task<ActionResult> Save([SericeParamsBinder] ChangeSet changeSet)
        {
            var res = await this.DomainService.ServiceApplyChangeSet(changeSet).ConfigureAwait(false);
            return Json(res);
        }

        [ActionName("refresh")]
        [HttpPost]
        public async Task<ActionResult> Refresh([SericeParamsBinder] RefreshInfo refreshInfo)
        {
            var res = await this.DomainService.ServiceRefreshRow(refreshInfo).ConfigureAwait(false);
            return Json(res);
        }

        [ActionName("invoke")]
        [HttpPost]
        public async Task<ActionResult> Invoke([SericeParamsBinder] InvokeRequest invokeInfo)
        {
            var res = await this.DomainService.ServiceInvokeMethod(invokeInfo).ConfigureAwait(false);
            return Json(res);
        }

        protected IDomainService DomainService
        {
            get
            {
                return this._DomainService.Value;
            }
        }

        protected T GetDomainService()
        {
            return (T)this.DomainService;
        }

        public ISerializer Serializer
        {
            get { return this._serializer; }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && this._DomainService.IsValueCreated)
            {
                this._DomainService.Value.Dispose();
            }
            this._DomainService = null;
            this._serializer = null;
            base.Dispose(disposing);
        }
    }
}

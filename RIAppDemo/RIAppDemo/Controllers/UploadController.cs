using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.SessionState;
using RIAppDemo.BLL.DataServices;
using RIAppDemo.Models;
using RIAPP.DataService.Mvc;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAppDemo.Controllers
{
    [SessionState(SessionStateBehavior.Disabled)]
    public class UploadController : Controller
    {
        /// <summary>
        /// Used in FileApi action
        /// </summary>
        /// <returns></returns>
        private UploadedFile RetrieveFileFromRequest()
        {
            string filename = null;
            string fileType = null;
            int fileSize = 0;
            int id = -1;
            Stream fileContents = null;

            if (Request.Files.Count > 0)
            {
                //they're uploading the old way
                var file = Request.Files[0];
                fileSize = file.ContentLength;
                fileContents = file.InputStream;
                fileType = file.ContentType;
                filename = file.FileName;
            }
            else if (Request.ContentLength > 0)
            {
                fileSize = Request.ContentLength;
                fileContents = Request.InputStream;
                filename = Request.Headers["X-File-Name"];
                fileType = Request.Headers["X-File-Type"];
                id = int.Parse(Request.Headers["X-Data-ID"]);
            }

            return new UploadedFile()
            {
                FileName = filename,
                ContentType = fileType,
                FileSize = fileSize,
                Contents = fileContents,
                DataID = id
            };
        }

        public ActionResult Index()
        {
            return new EmptyResult();
        }
   
        public ActionResult ThumbnailUpload()
        {
            try
            {
                UploadedFile file = RetrieveFileFromRequest();

                if (file.FileName != null)
                {
                    string filename = Path.GetFileName(file.FileName);
                    if (filename != null)
                    {
                          var args = new RIAPP.DataService.ServiceArgs(new Serializer(), this.User);
                          RIAppDemoService svc = new RIAppDemoService(args);
                          using (svc)
                          {
                             svc.SaveThumbnail(file.DataID, file.FileName, file.Contents);
                          }
                    }
                }

                return new HttpStatusCodeResult(200);
            }
            catch (Exception)
            {
                return new HttpStatusCodeResult(400);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RIAPP.DataService;
using RIAPP.DataService.Types;
using RIAPP.DataService.Mvc;
using RIAPP.DataService.Utils.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Linq;
using RIAppDemo.BLL.DataServices;
using System.Net.Http.Headers;

namespace RIAppDemo.Controllers
{
    public class FileController : ApiController
    {
        public FileController()
        {
        }

        public class UploadedFile
        {
            public int DataID { get; set; }
            public int FileSize { get; set; }
            public string FileName { get; set; }
            public string ContentType { get; set; }
            public HttpContent Content { get; set; }
        }

        private UploadedFile RetrieveFileFromRequest(HttpRequestMessage request)
        {
            string filename = null;
            string fileType = null;
            int fileSize = 0;
            int id = -1;
            IEnumerable<string> values;

            if (request.Headers.TryGetValues("X-File-Name", out values))
                filename= values.First();
            if (request.Headers.TryGetValues("X-File-Type", out values))
                fileType= values.First();
            if (request.Headers.TryGetValues("X-Data-ID", out values))
                id = int.Parse(values.First());

            return new UploadedFile()
            {
                FileName = filename,
                ContentType = fileType,
                FileSize = fileSize,
                Content =request.Content,
                DataID = id
            };
        }
                     
        #region Public API
        [HttpPost]
        public HttpResponseMessage UploadThumbnail(HttpRequestMessage request)
        {
            try
            {
                UploadedFile file = RetrieveFileFromRequest(request);

                if (file.FileName != null)
                {
                    string filename = Path.GetFileName(file.FileName);
                    if (filename != null)
                    {
                        var args = new RIAPP.DataService.ServiceArgs(new Serializer(), this.User);
                        RIAppDemoService svc = new RIAppDemoService(args);
                        using (svc)
                        {
                            svc.SaveThumbnail2(file.DataID, file.FileName, file.Content.CopyToAsync);
                        }
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                throw new HttpResponseException(response);
            }
        }

        [HttpGet]
        public HttpResponseMessage DownloadThumbnail(HttpRequestMessage request, string id)
        {
            try
            {
                var args = new RIAPP.DataService.ServiceArgs(new Serializer(), this.User);
                RIAppDemoService svc = new RIAppDemoService(args);
                using (svc)
                {
                    MemoryStream stream = new MemoryStream();
                    string fileName = svc.GetThumbnail(int.Parse(id), stream);
                    if (string.IsNullOrEmpty(fileName))
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    stream.Position = 0;
                    HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                    result.Content = new StreamContent(stream);
                    result.Content.Headers.ContentType = new MediaTypeHeaderValue(System.Net.Mime.MediaTypeNames.Image.Jpeg);
                    result.Content.Headers.Add("Content-Disposition", new string[]{string.Format("attachment; filename=\"{0}\"", fileName) });
                    return result;
                }
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                throw new HttpResponseException(response);
            }
        }

        [HttpGet]
        public HttpResponseMessage DownloadTemplate(HttpRequestMessage request, string name)
        {
            try
            {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string path1 = Path.Combine(baseDir, "Templates");
                string path2 = Path.GetFullPath(Path.Combine(path1, string.Format("{0}.html", name)));
                if (!path2.StartsWith(path1))
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                var stream = File.OpenRead(path2);
                result.Content = new StreamContent(stream);
                result.Content.Headers.ContentType = new MediaTypeHeaderValue(System.Net.Mime.MediaTypeNames.Text.Plain);
                return result;
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                throw new HttpResponseException(response);
            }
        }
        #endregion
    }
}

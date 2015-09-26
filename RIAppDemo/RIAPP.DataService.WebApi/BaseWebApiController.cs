using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RIAPP.DataService.Types;
using RIAPP.DataService.Utils.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using System.IO;
using System.Text;

namespace RIAPP.DataService.WebApi
{
    public abstract class BaseWebApiController<T> : ApiController
         where T : BaseDomainService
    {
        private ISerializer _serializer;
        private readonly System.Net.Http.Formatting.MediaTypeFormatter _mediaFormatter;
        private Lazy<T> _dataService;

        public BaseWebApiController()
        {
            this._serializer = new Serializer();
            this._mediaFormatter = new System.Net.Http.Formatting.JsonMediaTypeFormatter();
            this._dataService = new Lazy<T>(() => { return this.CreateDomainService(); }, true);
        }

        protected System.Net.Http.Formatting.MediaTypeFormatter MediaFormatter
        {
            get { return this._mediaFormatter; }
        }

        protected T DataService
        {
            get { return this._dataService.Value; }
        }

        protected virtual T CreateDomainService()
        {
            ServiceArgs args = new ServiceArgs(this._serializer, this.User);
            var service = (IDomainService)Activator.CreateInstance(typeof(T), args);
            return (T)service;
        }

        public class PlainTextActionResult : IHttpActionResult
        {
            public string Message { get; private set; }
            public HttpRequestMessage Request { get; private set; }

            public PlainTextActionResult(HttpRequestMessage request, string message)
            {
                this.Request = request;
                this.Message = message;
            }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                return Task.FromResult(ExecuteResult());
            }

            public HttpResponseMessage ExecuteResult()
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                response.Content = new StringContent(Message);
                response.RequestMessage = Request;
                return response;
            }
        }

        public class IncrementalActionResult : IHttpActionResult
        {
            public QueryResponse queryResponse { get; private set; }
            public HttpRequestMessage Request { get; private set; }
            private const string HEADER_MARK = "<head:{0}>";
            private StringBuilder _rowStringBuilder;
            private ISerializer _serializer;

            public IncrementalActionResult(HttpRequestMessage request, QueryResponse queryResponse, ISerializer serializer)
            {
                this.Request = request;
                this.queryResponse = queryResponse;
                this._serializer = serializer;
            }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                return Task.FromResult(ExecuteResult());
            }

            public HttpResponseMessage ExecuteResult()
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

                response.Content = new PushStreamContent((Stream stream, HttpContent httpContent, TransportContext context) =>
                {
                    StreamWriter writer = new StreamWriter(stream);
                    try
                    {
                        if (this.queryResponse.error != null)
                        {
                            //this result returns error. It does not contain rows.
                            writer.Write(this._serializer.Serialize(this.queryResponse));
                            writer.Flush();
                            return;
                        }
                        //Write rows in the stream separately - starting from included rows
                        Queue<IEnumerable<Row>> rowsQueue = new Queue<IEnumerable<Row>>();

                        if (this.queryResponse.included != null)
                        {
                            foreach (IncludedResult subResult in this.queryResponse.included)
                            {
                                if (subResult.rowCount > 0)
                                {
                                    rowsQueue.Enqueue(subResult.rows);
                                    subResult.rows = null; //set rows to null
                                }
                            }
                        }

                        //main rows in the end of the queue
                        if (this.queryResponse.rowCount > 0)
                        {
                            rowsQueue.Enqueue(this.queryResponse.rows);
                            this.queryResponse.rows = null;
                        }

                        string header = this._serializer.Serialize(this.queryResponse);
                        writer.Write(string.Format(HEADER_MARK, header.Length));
                        writer.Write(header);

                        writer.Write("["); //start rows array

                        //default is to flush only when all rows is written to the stream
                        int fetchSize = this.queryResponse.fetchSize <= 0 ? int.MaxValue : this.queryResponse.fetchSize;
                        int i = 0;

                        foreach (IEnumerable<Row> rows in rowsQueue)
                        {
                            foreach (var row in rows)
                            {
                                if (i > 0) { writer.Write(","); }
                                writer.Write(this._RowToJSON(row));
                                i += 1;
                                if ((i % fetchSize) == 0)
                                {
                                    writer.Flush();
                                }
                            }
                        }

                        writer.Write("]"); //end rows array
                        writer.Flush();
                    }
                    finally
                    {
                        writer.Close();
                    }

                }, System.Net.Mime.MediaTypeNames.Text.Plain);

                response.RequestMessage = Request;
                return response;
            }

            private static string _Encode(string str)
            {
                return System.Web.HttpUtility.JavaScriptStringEncode(str);
            }

            private static void _SerializeArray(object[] arr, StringBuilder sbld)
            {
                int i = 0;
                Array.ForEach<object>(arr, (value) =>
                {
                    if (i > 0)
                        sbld.Append(",");
                    if (value == null)
                    {
                        sbld.Append("null");
                    }
                    else
                    {
                        if (value is string)
                        {
                            sbld.Append(@"""");
                            sbld.Append(_Encode((string)value));
                            sbld.Append(@"""");
                        }
                        else if (value.GetType().IsArray)
                        {
                            sbld.Append(@"[");
                            _SerializeArray((object[])value, sbld);
                            sbld.Append(@"]");
                        }
                    }
                    i += 1;
                });
            }

            private string _RowToJSON(Row row)
            {
                if (this._rowStringBuilder == null)
                {
                    this._rowStringBuilder = new StringBuilder(512);
                }


                StringBuilder sb = this._rowStringBuilder;
                sb.Length = 0;
                sb.Append("{");
                sb.AppendFormat(@"""k"":""{0}"",""v"":[", _Encode(row.k));
                _SerializeArray(row.v, sb);
                sb.Append("]}");
                return sb.ToString();
            }
        }


        #region Public API
        [ActionName("xaml")]
        [HttpGet]
        public virtual IHttpActionResult GetXAML(HttpRequestMessage request, bool isDraft=true)
        {
            var info = this.DataService.ServiceGetXAML(isDraft);
            return new PlainTextActionResult(request, info);
        }

        [ActionName("csharp")]
        [HttpGet]
        public virtual IHttpActionResult GetCSHARP(HttpRequestMessage request)
        {
            var info = this.DataService.ServiceGetCSharp();
            return new PlainTextActionResult(request, info);
        }

        [ActionName("typescript")]
        [HttpGet]
        public virtual IHttpActionResult GetTypeScript(HttpRequestMessage request)
        {
            string comment = string.Format("\tGenerated from: {0} on {1:yyyy-MM-dd} at {1:HH:mm}\r\n\tDon't make manual changes here, because they will be lost when this db interface will be regenerated!", request.RequestUri, DateTime.Now);
            var info = this.DataService.ServiceGetTypeScript(comment);
            return new PlainTextActionResult(request, info);
        }

        [ActionName("permissions")]
        [HttpGet]
        public virtual HttpResponseMessage Permissions()
        {
            var res = this.DataService.ServiceGetPermissions();
            return Request.CreateResponse<Permissions>(HttpStatusCode.OK, res, this.MediaFormatter);
        }

        [ActionName("query")]
        [HttpPost]
        public virtual async Task<IHttpActionResult> Query(HttpRequestMessage request, QueryRequest query)
        {
            var svc = this.DataService;
            if (svc == null)
            {
                var response = Request.CreateResponse(HttpStatusCode.NotFound, "Service not found");
                throw new HttpResponseException(response);
            }
            var queryResponse = await svc.ServiceGetData(query).ConfigureAwait(false);
            IncrementalActionResult result = new IncrementalActionResult(request, queryResponse, this._serializer);
            return result;
        }

        [ActionName("refresh")]
        [HttpPost]
        public virtual async Task<HttpResponseMessage> Refresh(RefreshInfo refreshInfo)
        {
            var svc = this.DataService;
            if (svc == null)
            {
                var response = Request.CreateResponse(HttpStatusCode.NotFound, "Service not found");
                throw new HttpResponseException(response);
            }
            RefreshInfo svcData = await svc.ServiceRefreshRow(refreshInfo).ConfigureAwait(false);
            return Request.CreateResponse<RefreshInfo>(HttpStatusCode.OK, svcData, this.MediaFormatter);
        }

        [ActionName("invoke")]
        [HttpPost]
        public virtual async Task<HttpResponseMessage> Invoke(InvokeRequest invokeInfo)
        {
            var svc = this.DataService;
            if (svc == null)
            {
                var response = Request.CreateResponse(HttpStatusCode.NotFound, "Service not found");
                throw new HttpResponseException(response);
            }
            var svcData = await svc.ServiceInvokeMethod(invokeInfo).ConfigureAwait(false);
            return Request.CreateResponse<InvokeResponse>(HttpStatusCode.OK, svcData, this.MediaFormatter);
        }

        [ActionName("save")]
        [HttpPost]
        public virtual async Task<HttpResponseMessage> Save(ChangeSet changeSet)
        {
            var svcResponse = await this.DataService.ServiceApplyChangeSet(changeSet).ConfigureAwait(false);
            var response = Request.CreateResponse<ChangeSet>(HttpStatusCode.OK, svcResponse, this.MediaFormatter);
            return response;
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing && this._dataService.IsValueCreated)
            {
                ((IDisposable)this._dataService.Value).Dispose();
            }
            this._dataService = null;
            this._serializer = null;
            base.Dispose(disposing);
        }
    }
}
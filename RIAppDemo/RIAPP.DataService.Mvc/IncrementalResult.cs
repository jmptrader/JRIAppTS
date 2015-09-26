using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using RIAPP.DataService;
using System.Web;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Mvc
{

    public class IncrementalResult : ActionResult
    {
        private const string HEADER_MARK = "<head:{0}>";
        private StringBuilder _rowStringBuilder;
        private ISerializer _serializer;

        public IncrementalResult(QueryResponse res, ISerializer serializer)
        {
            this.Data = res;
            this._serializer = serializer;
        }

        public QueryResponse Data { get; set; }

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

        private string _RowToJSON(Row row) {
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

        public override void ExecuteResult(ControllerContext context)
        {
            var response = context.HttpContext.Response;
            response.Clear();
            response.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            response.Buffer = true;
            response.BufferOutput = true;
            response.Cache.SetCacheability(HttpCacheability.NoCache);
            //context.HttpContext.Response.IsClientConnected
            var writer = context.HttpContext.Response.Output;
            if (this.Data.error != null)
            {
                //this result returns error. It does not contain rows.
                writer.Write(this._serializer.Serialize(this.Data));
                writer.Flush();
                response.End();
                return;
            }
            //Write rows in the stream separately - starting from included rows
            Queue<IEnumerable<Row>> rowsQueue = new Queue<IEnumerable<Row>>();

            if (this.Data.included != null)
            {
                foreach (IncludedResult subResult in this.Data.included)
                {
                    if (subResult.rowCount > 0)
                    {
                        //System.Diagnostics.Debug.Assert(subResult.rowCount == subResult.rows.Count());
                        rowsQueue.Enqueue(subResult.rows);
                        subResult.rows = null; //set rows to null
                    }
                }
            }

            //main rows in the end of the queue
            if (this.Data.rowCount > 0)
            {
                //System.Diagnostics.Debug.Assert(this.Data.rowCount == this.Data.rows.Count());
                rowsQueue.Enqueue(this.Data.rows);
                this.Data.rows = null;
            }

            string header = this._serializer.Serialize(this.Data);
            writer.Write(string.Format(HEADER_MARK, header.Length));
            writer.Write(header);

            writer.Write("["); //start rows array

            //default is to flush only when all rows is written to the stream
            int fetchSize = this.Data.fetchSize<=0 ? int.MaxValue: this.Data.fetchSize;
            int i = 0;

            foreach(IEnumerable<Row> rows in rowsQueue)
            {
                foreach (var row in rows)
                {
                    if (i > 0) { writer.Write(","); }
                    writer.Write(this._RowToJSON(row));
                    i += 1;
                    if ((i % fetchSize) == 0)
                    {
                        writer.Flush();
                        response.Flush();
                    }
                }
            }
           
            writer.Write("]"); //end rows array
            writer.Flush();
            response.End();
        }
    }
}

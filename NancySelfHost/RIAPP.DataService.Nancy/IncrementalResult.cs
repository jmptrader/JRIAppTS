using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Nancy;
using Nancy.Responses;
using RIAPP.DataService;
using RIAPPInterface = RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Nancy
{

    public class IncrementalResult : Response
    {
        private const string HEADER_MARK = "<head:{0}>";
        private StringBuilder _rowStringBuilder;
        private RIAPPInterface.ISerializer _serializer;

        public IncrementalResult(QueryResponse res, RIAPPInterface.ISerializer serializer)
        {
            this.Data = res;
            this._serializer = serializer;
            this.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
            this.StatusCode = HttpStatusCode.OK;
            this.Contents = this.ExecuteResult();
        }

        public QueryResponse Data { get; set; }

        private string _RowToJSON(Row row) {
            if (this._rowStringBuilder == null)
            {
                this._rowStringBuilder = new StringBuilder(512);
            }
         
            StringBuilder sb = this._rowStringBuilder;
            sb.Length = 0;
            sb.Append(this._serializer.Serialize(row));
            return sb.ToString();
        }

        public Action<System.IO.Stream> ExecuteResult()
        {
            if (this.Data.error != null)
            {
                return stream =>
                {
                    using (var writer = new StreamWriter(stream, System.Text.Encoding.UTF8))
                    {
                        writer.Write(this._serializer.Serialize(this.Data));
                    }
                };
            }

            //Write rows in the stream separately - starting from included rows
            Queue<IEnumerable<Row>> rowsQueue = new Queue<IEnumerable<Row>>();

            if (this.Data.included != null)
            {
                foreach (IncludedResult subResult in this.Data.included)
                {
                    if (subResult.rowCount > 0)
                    {
                        rowsQueue.Enqueue(subResult.rows);
                        subResult.rows = null; //set rows to null
                    }
                }
            }

            //main rows in the end of the queue
            if (this.Data.rowCount > 0)
            {
                rowsQueue.Enqueue(this.Data.rows);
                this.Data.rows = null;
            }

            return stream =>
            {
                using (var writer = new StreamWriter(stream, System.Text.Encoding.UTF8))
                {
                    string header = this._serializer.Serialize(this.Data);
                    writer.Write(string.Format(HEADER_MARK, header.Length));
                    writer.Write(header);

                    writer.Write("["); //start rows array

                    //default is to flush only when all rows is written to the stream
                    int fetchSize = this.Data.fetchSize <= 0 ? int.MaxValue : this.Data.fetchSize;
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
                }
            };
        }
    }
}

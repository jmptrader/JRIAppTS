using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Net.Http.Headers;
using System.Net;
using System.Collections.Concurrent;
using System.Threading;
using Newtonsoft.Json;
using System.Diagnostics;
using RIAppDemo.Models;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace RIAppDemo.Controllers
{
    //Controller for Server side events
    public class SSEWebApiController : ApiController
    {
        private class Client: IDisposable
        {
            private StreamWriter _stream;
            private string _id;
            private DateTime _lastAccessTime;
            private DateTime _createdTime;
            private bool _isDisposed = false;

            public Client(StreamWriter stream, string id)
            {
                this._stream = stream;
                this._id = id;
                this._createdTime = DateTime.Now;
                this._lastAccessTime = this._createdTime;
            }

            public StreamWriter stream
            {
                get { return this._stream; }
            }

            public string id
            {
                get { return this._id; }
            }

            public DateTime lastAccessTime
            {
                get { return this._lastAccessTime; }
            }

            public DateTime CreatedTime
            {
                get { return this._createdTime; }
            }

            public void UpdateAccessTime()
            {
                this._lastAccessTime = DateTime.Now;
            }

            public async Task WriteAndSend(string data)
            {
                if (this._isDisposed)
                    return;
                this.UpdateAccessTime();
                await this.stream.WriteLineAsync("data:" + data + "\n");
                if (this._isDisposed)
                    return;
                await this.stream.FlushAsync();
            }

           
            protected virtual void Log(Exception ex)
            {
                SSEWebApiController.Log(ex);
            }

            public void Dispose()
            {
                try
                {
                    this._isDisposed = true;
                    this._stream.Close();
                }
                catch (Exception ex)
                {
                    Log(ex);
                }
            }

            public void Close()
            {
                this.Dispose();
            }
        }

        private const double CLIENT_TIME_OUT = 10;
        private static readonly Lazy<Timer> _cleanUpTimer = new Lazy<Timer>(() => new Timer(CleanUpTimerCallback, null, Timeout.Infinite, Timeout.Infinite));
        private static readonly ConcurrentDictionary<string, Client> _clients = new ConcurrentDictionary<string, Client>();
        private volatile static bool _isTimerEnabled = false;
        private volatile static int _clientCount = 0;
        private static Task _messagesTask;
        private static CancellationTokenSource _src;

        static SSEWebApiController()
        {
            _src = new CancellationTokenSource();
            var token = _src.Token;
            _messagesTask = new Task(() =>
            {
                var task = DoMessages(token);
                task.Wait();
            }, token, TaskCreationOptions.LongRunning);
            _messagesTask.Start();
        }

        private static async Task DoMessages(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    await TryGetAndPostMessages(ct);
                }
                catch (Exception ex)
                {
                    Log(ex);
                }
            }
            ct.ThrowIfCancellationRequested();
        }

        private static async Task TryGetAndPostMessages(CancellationToken ct)
        {
            //Demo Test: Generating Random messages at random intervals and send it to random clients
            Random rnd = new Random();
            await Task.Delay(rnd.Next(1000, 5000), ct);
            if (ct.IsCancellationRequested)
                return;
            Client client = null;
            //Get one Random client
            lock (_clients)
            {
                int cnt = _clients.Count();
                if (cnt > 0)
                {
                    int num = rnd.Next(100000) % cnt;
                    client = _clients.Skip(num).Take(1).Select(c=>c.Value).First();
                }
            }

            if (client == null)
                return;
            /*
            //Remove the clients after random intervals simulating different task times for each client
            if (DateTime.Now - client.CreatedTime > TimeSpan.FromSeconds(rnd.Next(60, 180)))
            {
                RemoveClient(client.id);
                return;
            }
           */

            string[] words = new string[] { "Test", "How", "Messaging", "Working", "Random", "Words", "For", "Demo", "Purposes", "Only", "Needed" };
            string message = "<b>Quote of the day</b>: <i>"+ string.Join(" ", words.Select(w => words[rnd.Next(0, 10)]).ToArray())+"</i>";
            SSEMessage msg = new SSEMessage() { clientID = client.id, payload = new Payload { message = message } };
            bool res = await PostMessage(msg);
        }

        protected static internal void Log(Exception ex)
        {
            System.Diagnostics.Debug.WriteLine(ex.Message);
        }

        [Authorize]
        public HttpResponseMessage Get(HttpRequestMessage request, string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            Guid parsedID = Guid.Parse(id);

            HttpResponseMessage response = request.CreateResponse();
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            response.Headers.Add("Cache-Control", "no-cache, must-revalidate");
            var pushContent = new PushStreamContent((Stream stream, HttpContent content, TransportContext context) =>
            {
                StreamWriter streamwriter = new StreamWriter(stream);
                var client = new Client(streamwriter, id);
                lock (_clients)
                {
                    if (_clients.ContainsKey(client.id))
                        _RemoveClient(client.id);
                    bool isAdded = _clients.TryAdd(client.id, client);
                    if (isAdded)
                        ++_clientCount;
                }
                _CheckCleanUpTimer();
            }, "text/event-stream");
            response.Content = pushContent;
            return response;
        }

        [Authorize]
        [ActionName("PostMessage")]
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] SSEMessage message)
        {
            bool res = await PostMessage(message);
            if (res)
            {
                var response = Request.CreateResponse(HttpStatusCode.Created);
                return response;
            }
            else
                return Request.CreateResponse(HttpStatusCode.NotFound);
        }

        [Authorize]
        [ActionName("CloseClient")]
        [HttpPost]
        public HttpResponseMessage Close(string id)
        {
            if (_RemoveClient(id))
                return Request.CreateResponse(HttpStatusCode.OK);
            else
                return Request.CreateResponse(HttpStatusCode.NotFound);
        }
       
        public static bool RemoveClient(string id)
        {
            return _RemoveClient(id);
        }

        //Cancel sending messages to clients
        public static void StopService()
        {
            _src.Cancel();
        }

        public static async Task<bool> PostMessage(SSEMessage message)
        {
            Client client;
            int cnt = _clients.Count();
            if (_clients.TryGetValue(message.clientID, out client))
            {
                try
                {
                    if (message.payload.message == "DUMMY")
                    {
                        client.UpdateAccessTime();
                    }
                    else
                    {
                        string data = JsonConvert.SerializeObject(message.payload);
                        await client.WriteAndSend(data);
                    }
                    return true;
                }
                catch (System.Web.HttpException)
                {
                    _RemoveClient(client.id);

                }
                catch (Exception)
                {
                    //also needs to log here
                    _RemoveClient(client.id);
                }

                return false;
            }
            else
                return false;
        }

        #region PRIVATE METHODS
        private static bool _RemoveClient(string id)
        {
            try
            {
                lock (_clients)
                {
                    Client client;
                    if (_clients.TryRemove(id, out client))
                    {
                        --_clientCount;
                        client.Dispose();
                        return true;
                    }
                }
                return false;
            }
            finally
            {
                _CheckCleanUpTimer();
            }
        }

        private static void _CheckCleanUpTimer()
        {
            lock (_cleanUpTimer)
            {
                if (!_isTimerEnabled && _clientCount > 0)
                {
                    Timer t = _cleanUpTimer.Value;
                    t.Change(TimeSpan.FromMinutes(CLIENT_TIME_OUT), TimeSpan.FromMinutes(CLIENT_TIME_OUT / 2));
                    _isTimerEnabled = true;
                }
                else if (_isTimerEnabled && _clientCount == 0)
                {
                    Timer t = _cleanUpTimer.Value;
                    t.Change(Timeout.Infinite, Timeout.Infinite);
                    _isTimerEnabled = false;
                }
                else
                    return;
            }
        }

        private static void CleanUpTimerCallback(object state)
        {
            DateTime now = DateTime.Now;
            var clients = _clients.Values.ToArray();
            Array.ForEach(clients, (client) =>
            {
                if ((now - client.lastAccessTime).Minutes >= CLIENT_TIME_OUT)
                {
                    _RemoveClient(client.id);
                }
            });
            _CheckCleanUpTimer();
        }
        #endregion
    }
}

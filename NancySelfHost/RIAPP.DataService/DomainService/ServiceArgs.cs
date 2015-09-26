using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Principal;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService
{
    public class ServiceArgs: IServiceArgs
    {
        private ISerializer _serializer;
        private IPrincipal _principal;

        public ServiceArgs(ISerializer serializer, IPrincipal principal)
        {
            this._serializer = serializer;
            this._principal = principal;
        }

        public IPrincipal principal
        {
            get
            {
                return this._principal;
            }
        }

        public ISerializer serializer
        {
            get
            {
                return this._serializer;
            }
        }
    }
}

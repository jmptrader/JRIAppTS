using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Principal;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService
{
    public interface IServiceArgs
    {
        IPrincipal principal
        {
            get;
        }
        ISerializer serializer
        {
            get;
        }
    }
}

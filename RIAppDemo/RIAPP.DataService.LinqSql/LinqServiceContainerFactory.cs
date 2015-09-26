using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Security;
using System.Security.Principal;
using RIAPP.DataService.Utils;

namespace RIAPP.DataService.LinqSql
{

    public class LinqServiceContainerFactory : ServiceContainerFactory
    {
        public override IServiceContainer CreateServiceContainer(Type dataServiceType, IPrincipal principal)
        {
            var serviceContainer = base.CreateServiceContainer(dataServiceType, principal);
            serviceContainer.ReplaceService(typeof(IValueConverter), new LinqValueConverter(serviceContainer));
            return serviceContainer;
        }
    }
}

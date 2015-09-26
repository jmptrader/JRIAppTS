using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Security;
using System.Security.Principal;
using RIAPP.DataService.Utils;


namespace RIAPP.DataService
{
    public class ServiceContainerFactory
    {
        public virtual IServiceContainer CreateServiceContainer(Type dataServiceType, IPrincipal principal) 
        { 
            var serviceContainer = new ServiceContainer();
            var authorizer = new AuthorizerClass(dataServiceType, principal);
            serviceContainer.AddService(typeof(IAuthorizer), authorizer);
            var valueConverter = new ValueConverter(serviceContainer);
            serviceContainer.AddService(typeof(IValueConverter), valueConverter);
            var dataHelper =  new DataHelper(serviceContainer);
            serviceContainer.AddService(typeof(IDataHelper), dataHelper);
            var validationHelper = new ValidationHelper(serviceContainer);
            serviceContainer.AddService(typeof(IValidationHelper), validationHelper);
            var queryHelper = new QueryHelper(serviceContainer);
            serviceContainer.AddService(typeof(IQueryHelper), queryHelper);
            return serviceContainer;
        }
    }
}

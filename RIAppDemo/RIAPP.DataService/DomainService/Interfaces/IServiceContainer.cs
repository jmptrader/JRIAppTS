using System;
namespace RIAPP.DataService
{
    public interface IServiceContainer
    {
        void AddService(Type serviceType, Object instance);

        void ReplaceService(Type serviceType, Object instance);

        void RemoveService(Type serviceType);

        Object LocateService(Type serviceType);

        T LocateService<T>();

        RIAPP.DataService.Security.IAuthorizer Authorizer { get; }
        RIAPP.DataService.Utils.Interfaces.IDataHelper DataHelper { get; }
        RIAPP.DataService.Utils.Interfaces.IQueryHelper QueryHelper { get; }
        RIAPP.DataService.Utils.Interfaces.ISerializer Serializer { get; }
        RIAPP.DataService.Utils.Interfaces.IValidationHelper ValidationHelper { get; }
        RIAPP.DataService.Utils.Interfaces.IValueConverter ValueConverter { get; }
    }
}

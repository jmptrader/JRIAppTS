using System;
using System.Collections.Concurrent;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Security;

namespace RIAPP.DataService
{
    public class ServiceContainer : IServiceContainer
    {
        private ConcurrentDictionary<Type, object> _services;

        public ServiceContainer()
        {
            this._services = new ConcurrentDictionary<Type, object>();
        }

        public void AddService(Type serviceType, Object instance){
            this._services.TryAdd(serviceType, instance);
        }

        public void ReplaceService(Type serviceType, Object instance)
        {
            bool isOk = false;
            while (!isOk)
            {
                Object old = LocateService(serviceType);
                if (old != null)
                    isOk = this._services.TryUpdate(serviceType, instance, old);
                else
                    isOk = this._services.TryAdd(serviceType, instance);
            }
        }

        public void RemoveService(Type serviceType)
        {
            Object old;
            this._services.TryRemove(serviceType, out old);
        }

        public Object LocateService(Type serviceType)
        {
            Object result;
            this._services.TryGetValue(serviceType, out result);
            return result;
        }

        public T LocateService<T>()
        {
            return (T)this.LocateService(typeof(T));
        }

        public IAuthorizer Authorizer
        {
            get
            {
                return this.LocateService<IAuthorizer>();
            }
        }

        public ISerializer Serializer
        {
            get { return this.LocateService<ISerializer>(); }
        }

        public IValueConverter ValueConverter
        {
            get { return this.LocateService<IValueConverter>(); }
        }

        public IDataHelper DataHelper
        {
            get
            {
                return this.LocateService<IDataHelper>();
            }
        }

        public IQueryHelper QueryHelper
        {
            get
            {
                return this.LocateService<IQueryHelper>();
            }
        }

        public IValidationHelper ValidationHelper
        {
            get
            {
                return this.LocateService<IValidationHelper>();
            }
        }
    }
}


using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Text;
using RIAPP.DataService.Types;
using RIAPP.DataService.Resources;
using System.Collections.ObjectModel;

namespace RIAPP.DataService.Utils
{
    public class CachedMetadata
    {
        DbSetsDictionary _dbSets = new DbSetsDictionary();
        AssociationsDictionary _associations = new AssociationsDictionary();
        MethodsList _methodDescriptions;
        IReadOnlyDictionary<string, MethodDescription> _invokeMethods;
        IReadOnlyDictionary<string, MethodDescription> _queryMethods;

        public CachedMetadata() 
        {
        }

        internal void InitMethods(MethodsList methods)
        {
            IDictionary<string, MethodDescription> invokeMeth = new Dictionary<string, MethodDescription>();
            IDictionary<string, MethodDescription> queryMeth = new Dictionary<string, MethodDescription>();
            methods.ForEach((md) =>
            {
                if (md.isQuery)
                {
                    queryMeth.Add(md.methodName, md);
                }
                else
                {
                    invokeMeth.Add(md.methodName, md);
                }
            });

            lock (this)
            {
                this._methodDescriptions = methods;
                this._invokeMethods = new ReadOnlyDictionary<string, MethodDescription>(invokeMeth);
                this._queryMethods = new ReadOnlyDictionary<string, MethodDescription>(queryMeth);
            }
        }

        internal IReadOnlyDictionary<string, MethodDescription> invokeMethods { get { return this._invokeMethods; } }
        internal IReadOnlyDictionary<string, MethodDescription> queryMethods { get { return this._queryMethods; } }

        public MethodDescription GetQueryMethod(string name)
        {
            MethodDescription method = null;
            lock (this._queryMethods)
            {
                if (!queryMethods.TryGetValue(name, out method))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_QUERY_NAME_INVALID, name));
                }
            }
            return method;
        }

        public MethodDescription GetInvokeMethod(string name)
        {
            MethodDescription method = null;
            lock (this._invokeMethods)
            {
                if (!invokeMethods.TryGetValue(name, out method))
                {
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_METH_NAME_INVALID, name));
                }
            }
            return method;
        }

        public DbSetsDictionary dbSets { get { return _dbSets; } }
        public AssociationsDictionary associations { get { return _associations; } }
        public MethodsList methodDescriptions { get { return this._methodDescriptions; } }
      }


    public class MetadataCache : ConcurrentDictionary<Type, CachedMetadata>
    {
        public MetadataCache()
        {
        }
    }

}

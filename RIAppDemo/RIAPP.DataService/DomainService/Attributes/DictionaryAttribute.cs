using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple=false, Inherited=false)]
    public class DictionaryAttribute: Attribute
    {
        public DictionaryAttribute()
        {
        }

        /// <summary>
        /// The name of the property on class that is the dictionary's key
        /// </summary>
        public string KeyName
        {
            get;
            set;
        }

        /// <summary>
        /// The name of the typed dictionary that will be generated on the client
        /// </summary>
        public string DictionaryName
        {
            get;
            set;
        }
    }
}

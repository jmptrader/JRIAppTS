using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple=false, Inherited=false)]
    public class ListAttribute: Attribute
    {
        public ListAttribute()
        {
        }

      
        /// <summary>
        /// The name of the typed list that will be generated on the client
        /// </summary>
        public string ListName
        {
            get;
            set;
        }
    }
}

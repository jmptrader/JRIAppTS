using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple=false, Inherited=false)]
    public class ExtendsAttribute: Attribute
    {
        public ExtendsAttribute()
        {
            this.InterfaceNames = new string[0];
        }

      
        public string[] InterfaceNames
        {
            get;
            set;
        }
    }
}

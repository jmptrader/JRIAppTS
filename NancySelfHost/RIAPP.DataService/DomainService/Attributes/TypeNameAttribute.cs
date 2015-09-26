using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple=false, Inherited=false)]
    public class TypeNameAttribute: Attribute
    {
        public TypeNameAttribute(string name)
        {
            this.Name = name;
        }

      
        public string Name
        {
            get;
            set;
        }
    }
}

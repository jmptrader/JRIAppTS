using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple=false, Inherited=false)]
    public class DeleteAttribute: Attribute
    {
        public DeleteAttribute()
        {
        }
    }
}

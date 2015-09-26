using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct | AttributeTargets.Enum, AllowMultiple=false, Inherited=false)]
    public class CommentAttribute: Attribute
    {
        public CommentAttribute()
        {
        }

      
        public string Text
        {
            get;
            set;
        }
    }
}

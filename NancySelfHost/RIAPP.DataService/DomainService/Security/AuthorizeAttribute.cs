using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple=true, Inherited=false)]
    public class AuthorizeAttribute: Attribute
    {
        public AuthorizeAttribute()
        {
            this.Roles = new string[0];
        }

        public string[] Roles
        {
            get;
            set;
        }

        public string RolesString
        {
            get
            {
                return string.Join(",", this.Roles);
            }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    this.Roles = new string[0];
                }
                else
                {
                    this.Roles = value.Split(',', ';');
                }
            }
        }
    }
}

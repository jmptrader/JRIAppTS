using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    /// <summary>
    /// This atribute assignes roles for the method which override the roles assigned in the dataservice or the other authorize attributes
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple=false, Inherited=false)]
    public class OverrideAuthorizeAttribute: Attribute
    {
        public OverrideAuthorizeAttribute()
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

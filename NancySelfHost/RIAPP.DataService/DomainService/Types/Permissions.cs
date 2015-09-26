using RIAPP.DataService.Utils;
using System;
using System.Runtime.Serialization;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public partial class Permissions
    {
        private PermissionList _permissions = new PermissionList();
       
        public Permissions()
        {
            this.serverTimezone = DataHelper.GetLocalDateTimezoneOffset(DateTime.Now);
        }

        [DataMember]
        public PermissionList permissions
        {
            get
            {
                return _permissions;
            }
            set
            {
                this._permissions = value;
            }
        }


        [DataMember]
        public int serverTimezone
        {
            get;
            set;
        }
    }
}

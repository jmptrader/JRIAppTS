using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ComponentModel;
using RIAPP.DataService.Resources;
using RIAPP.DataService;
using System.Security.Principal;
using System.Web.Script.Serialization;
using RIAPP.DataService.Utils;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public partial class MetadataResult
    {
        private DBSetList _dbSets = new DBSetList();
        private AssocList _associations = new AssocList();
        private MethodsList _svcMethods = new MethodsList();

        public MetadataResult()
        {
            this.serverTimezone = DataHelper.GetLocalDateTimezoneOffset(DateTime.Now);
        }

        [DataMember]
        public DBSetList dbSets
        {
            get
            {
                return _dbSets;
            }
            set
            {
                this._dbSets = value;
            }
        }

        [DataMember]
        public AssocList associations
        {
            get
            {
                return _associations;
            }
            set
            {
                this._associations = value;
            }
        }

        [DataMember]
        public MethodsList methods
        {
            get
            {
                return _svcMethods;
            }
            set
            {
                this._svcMethods = value;
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

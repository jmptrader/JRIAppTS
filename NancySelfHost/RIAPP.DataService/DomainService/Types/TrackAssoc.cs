using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public class TrackAssoc
    {
        [DataMember]
        public string assocName
        {
            get;
            set;
        }
        [DataMember]
        public string parentKey
        {
            get;
            set;
        }
        [DataMember]
        public string childKey
        {
            get;
            set;
        }
    }
}

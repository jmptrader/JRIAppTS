using System;
using System.Runtime.Serialization;
using System.Reflection;
using RIAPP.DataService.Resources;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public partial class Value
    {
        public Value()
        {
             val = null;
             ord = -1;
        }

        [DataMember]
        public string val
        {
            get;
            set;
        }


        [DataMember]
        public int ord
        {
            get;
            set;
        }

    }
}

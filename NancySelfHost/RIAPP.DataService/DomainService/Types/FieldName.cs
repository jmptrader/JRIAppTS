using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;


namespace RIAPP.DataService.Types
{
    [DataContract]
    public class FieldName
    {
        /// <summary>
        /// Field name
        /// </summary>
        [DataMember]
        public string n
        {
            get;
            set;
        }


        /// <summary>
        /// For object field it contains property names (nested fields)
        /// </summary>
        [DataMember]
        public FieldName[] p
        {
            get;
            set;
        }
    }
}

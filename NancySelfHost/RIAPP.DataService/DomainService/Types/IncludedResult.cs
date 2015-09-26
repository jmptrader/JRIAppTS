using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;


namespace RIAPP.DataService.Types
{
    [DataContract]
    public class IncludedResult
    {
        /// <summary>
        /// field names
        /// </summary>
        [DataMember]
        public IEnumerable<FieldName> names
        {
            get;
            set;
        }

        [DataMember]
        public IEnumerable<Row> rows
        {
            get;
            set;
        }

        /// <summary>
        /// a number of rows in the result
        /// </summary>
        [DataMember]
        public int rowCount
        {
            get;
            set;
        }

        [DataMember]
        public string dbSetName
        {
            get;
            set;
        }

    }
}

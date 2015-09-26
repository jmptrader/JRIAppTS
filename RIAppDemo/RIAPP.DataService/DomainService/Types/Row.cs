using System;
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public class Row
    {
        public Row()
        {
            this.v = new object[0];
            k = string.Empty;
        }


        /// <summary>
        /// array of row values, each value in its string form
        /// but for object fields the value is an array of values (that's why the property uses object[] type)
        /// </summary>
        [DataMember]
        public object[] v
        {
            get;
            set;
        }

       
        /// <summary>
        /// Unique key in a DbSet - primary key values concantenated by ;
        /// used on the client to uniquely identify Entities
        /// </summary>
        [DataMember]
        public string k
        {
            get;
            set;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ComponentModel;


namespace RIAPP.DataService.Types
{
  
    [DataContract]
    public class SortItem
    {
        public SortItem()
        {
            this.fieldName = string.Empty;
            this.sortOrder = SortOrder.ASC;
        }

        [DataMember]
        public string fieldName
        {
            get;
            set;
        }

        [DataMember]
        public SortOrder sortOrder
        {
            get;
            set;
        }
    }
 

    [DataContract]
    public class SortInfo
    {
        public SortInfo()
        {
            this.sortItems = new List<SortItem>();
        }

        [DataMember]
        public List<SortItem> sortItems
        {
            get;
            set;
        }
    }
}

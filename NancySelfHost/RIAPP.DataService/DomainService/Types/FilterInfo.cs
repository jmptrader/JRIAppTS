using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ComponentModel;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public class FilterItem
    {
        public FilterItem()
        {
            this.fieldName = string.Empty;
            this.values = new List<string>();
            this.kind = FilterType.Equals;
        }

        [DataMember]
        public string fieldName
        {
            get;
            set;
        }

        [DataMember]
        public List<string> values
        {
            get;
            set;
        }

        [DataMember]
        public FilterType kind
        {
            get;
            set;
        }
    }

    [DataContract]
    public class FilterInfo
    {

        public FilterInfo()
        {
            this.filterItems = new List<FilterItem>();
        }

        [DataMember]
        public List<FilterItem> filterItems
        {
            get;
            set;
        }
    }
}

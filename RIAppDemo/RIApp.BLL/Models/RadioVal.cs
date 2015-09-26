using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService;

namespace RIAppDemo.BLL.Models
{

    [Dictionary(KeyName="key", DictionaryName="RadioValDictionary")]
    public class RadioVal
    {
        public string key
        {
            get;
            set;
        }

        public string value
        {
            get;
            set;
        }

        public string comment
        {
            get;
            set;
        }
    }
}

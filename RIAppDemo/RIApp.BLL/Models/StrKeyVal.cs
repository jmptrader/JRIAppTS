using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService;

namespace RIAppDemo.BLL.Models
{

    [Dictionary(KeyName="key", DictionaryName="StrKeyValDictionary")]
    [Comment(Text="Generated from C# StrKeyVal model")]
    public class StrKeyVal
    {
        public string key
        {
            get;
            set;
        }

        public string val
        {
            get;
            set;
        }
    }
}

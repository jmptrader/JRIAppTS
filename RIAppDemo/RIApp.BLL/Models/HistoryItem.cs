using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService;

namespace RIAppDemo.BLL.Models
{

    [List(ListName="HistoryList")]
    [Comment(Text = "Generated from C# HistoryItem model")]
    [TypeName("IHistoryItem")]
    //[Extends(InterfaceNames= new string[]{"RIAPP.IEditable"})]
    public class HistoryItem
    {
        public string radioValue
        {
            get;
            set;
        }

        public DateTime time
        {
            get;
            set;
        }
    }
}

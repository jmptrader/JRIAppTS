using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RIAppDemo.Models
{
    public class SPATemplate
    {
        public SPATemplate() 
        {
            this.BindAddNewOrder = "{this.command,to=addNewCommand,source=customerVM.ordersVM}";
            this.OptionsAddNewOrder = "options={tip:This is not a Real World example how to add an order!!!}";
        }

        public string BindAddNewOrder { get; set; }
        public string OptionsAddNewOrder { get; set; }
    }
}
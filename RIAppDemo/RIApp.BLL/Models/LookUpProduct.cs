using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService;


namespace RIAppDemo.BLL.Models
{
    [TypeName("ITestLookUpProduct")]
    public class LookUpProduct
    {
        public int ProductID { get; set; }
        public string Name { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService;

namespace RIAppDemo.BLL.Models
{
    [TypeName("IAddressInfo2")]
    public class AddressInfo
    {
        public int AddressID { get; set; }
        public string AddressLine1 { get; set; }
        public string City { get; set; }
        public string StateProvince { get; set; }
        public string CountryRegion { get; set; }
    }
}

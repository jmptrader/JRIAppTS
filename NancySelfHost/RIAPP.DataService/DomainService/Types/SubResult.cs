using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService.Types
{
    public class SubResult
    {
        public SubResult() 
        {
        }
        
        public string dbSetName
        {
            get;
            set;
        }

        public IEnumerable Result
        {
            get;
            set;
        }
    }
}

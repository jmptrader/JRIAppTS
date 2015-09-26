using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public class ValidationErrorInfo
    {
        public ValidationErrorInfo()
        {
            
        }

        public ValidationErrorInfo(string message)
        {
            this.message = message;
        }

        public ValidationErrorInfo(string fieldName, string message)
        {
            this.fieldName = fieldName;
            this.message = message;
        }

        [DataMember]
        public string fieldName { get; set; }
        [DataMember]
        public string message { get; set; }
    }
}

using System;
using System.Runtime.Serialization;
using System.ComponentModel;
using System.Web.Script.Serialization;

namespace RIAPP.DataService.Types
{
    
    [DataContract]
    public class ErrorInfo
    {
        public ErrorInfo():
            this(null,null)
        {
           
        }

        public ErrorInfo(string message, string name)
        {
            this.message = message;
            this.name = name;
        }

        [DataMember]
        public string message
        {
            get;
            set;
        }

        [DataMember]
        public string name
        {
            get;
            set;
        }
    }

}

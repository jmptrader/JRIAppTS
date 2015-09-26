using System.Runtime.Serialization;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public class InvokeRequest
    {
        private MethodParameters _paramInfo = new MethodParameters();
     
        [DataMember]
        public string methodName
        {
            get;
            set;
        }

        [DataMember]
        public MethodParameters paramInfo
        {
            get { return _paramInfo; }
            set { _paramInfo = value; }
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public class MethodDescription
    {

        public MethodDescription()
        {
            this.parameters = new List<ParamMetadata>();
            this.methodResult = false;
        }

        [DataMember]
        public string methodName
        {
            get;
            set;
        }

        [DataMember]
        public List<ParamMetadata> parameters
        {
            get;
            set;
        }

        [DataMember]
        [Description("Returns or not result from method invocation")]
        public bool methodResult
        {
            get;
            set;
        }

        [DataMember]
        [Description("is it Query method")]
        public bool isQuery
        {
            get;
            set;
        }

        [IgnoreDataMember]
        [ScriptIgnore]
        public System.Reflection.MethodInfo methodInfo
        {
            get;
            set;
        }

      
        /// <summary>
        /// Generates Data Services' method description which is convertable to JSON
        /// and can be consumed by clients
        /// </summary>
        /// <param name="methodInfo"></param>
        /// <param name="isQuery"></param>
        /// <param name="dataHelper"></param>
        /// <returns></returns>
        public static MethodDescription FromMethodInfo(MethodInfo methodInfo, MethodType methodType, IServiceContainer container)
        {
            Type returnType = methodInfo.ReturnType;
            bool isVoid = returnType == typeof(void);
            MethodDescription methDescription = new MethodDescription();
            methDescription.methodInfo = methodInfo;
            methDescription.methodName = methodInfo.Name;
            methDescription.isQuery = methodType == MethodType.Query;

            if (!isVoid)
                methDescription.methodResult = true;
            //else Result is Converted to JSON
            ParameterInfo[] paramsInfo = methodInfo.GetParameters();
            for (var i = 0; i < paramsInfo.Length; ++i) {
                ParamMetadata param = ParamMetadata.FromParamInfo(paramsInfo[i], container);
                param.ordinal = i;
                methDescription.parameters.Add(param);
            }
            return methDescription;
        }
    }
}

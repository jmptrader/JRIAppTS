using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService.WebApi
{
    /// <summary>
    /// serialize an object to JSON
    /// </summary>
    public class Serializer : ISerializer
    {
        public Serializer()
        {
        }

        public string Serialize(object obj)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        }

        public object DeSerialize(string input, Type targetType)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject(input, targetType);
        }

        public object DeserializeObject(string input)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject(input);
        }
    }

}

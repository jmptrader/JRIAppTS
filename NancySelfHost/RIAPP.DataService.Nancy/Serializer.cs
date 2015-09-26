using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Utils.Interfaces;
using Newtonsoft.Json;

namespace RIAPP.DataService.Nancy
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
            return JsonConvert.SerializeObject(obj);
        }

        public object DeSerialize(string input, Type targetType)
        {
            return JsonConvert.DeserializeObject(input, targetType);
        }

        public object DeserializeObject(string input)
        {
            return JsonConvert.DeserializeObject(input);
        }
    }

}

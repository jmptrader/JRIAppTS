using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService.Utils.Interfaces
{
    public interface ISerializer
    {
        string Serialize(object obj);
        object DeSerialize(string input, Type targetType);
        object DeserializeObject(string input);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    public class UnsupportedTypeException : DomainServiceException
    {
        public UnsupportedTypeException()
            : base()
        {
        }

        public UnsupportedTypeException(string message)
            : base(message)
        {
        }

        public UnsupportedTypeException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}

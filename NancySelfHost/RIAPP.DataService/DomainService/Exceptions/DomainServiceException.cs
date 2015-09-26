using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    public class DomainServiceException: Exception
    {
        public DomainServiceException()
            : base()
        {
        }

        public DomainServiceException(string message)
            : base(message)
        {
        }

        public DomainServiceException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}

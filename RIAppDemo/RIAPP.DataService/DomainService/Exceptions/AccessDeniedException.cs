using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    public class AccessDeniedException: DomainServiceException
    {
        public AccessDeniedException()
            : base()
        {
        }

        public AccessDeniedException(string message)
            : base(message)
        {
        }

        public AccessDeniedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}

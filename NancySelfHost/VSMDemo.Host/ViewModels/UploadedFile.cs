using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace VSMDemo.Host.ViewModels
{
    public class UploadedFile
    {
        public int DataID { get; set; }
        public int FileSize { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public Stream Contents { get; set; }
    }
}

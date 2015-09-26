using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace RIAppDemo.Utils
{
    public static class UrlHelperEx
    {
        public static string Content(this System.Web.Mvc.UrlHelper Url, string Path, bool addTimeStamp)
        {
            if (!addTimeStamp)
                return Url.Content(Path);

            string serverPath = HttpContext.Current.Server.MapPath(Path);
            DateTime lastWrite = File.GetLastWriteTimeUtc(serverPath);
            string result = lastWrite.Ticks.ToString();
            return Url.Content(Path) + "?t=" + result;
        }
    }
}
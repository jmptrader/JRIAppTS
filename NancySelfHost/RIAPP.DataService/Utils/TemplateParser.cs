using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.IO;

namespace RIAPP.DataService.Utils
{
    public class TemplateParser
    {
        private IEnumerable<DocPart> _docParts;

        public TemplateParser(string resourceID)
        {
            string template = ResourceHelper.GetResourceString(resourceID);
            this._docParts = this.ParseTemplate(template);
        }

        public struct DocPart
        {
            public bool isPlaceHolder;
            public string value;
            public string format;
        }

     
        private DocPart GetDocPart(string str)
        {
            string[] parts = str.Split(':').Select(s => s.Trim()).ToArray();
            return new DocPart { isPlaceHolder = true, value = parts[0].ToUpperInvariant(), format = parts.Length > 1 ? parts[1] : null };
        }

        private IEnumerable<DocPart> ParseTemplate(string template)
        {
            char? prevChar = null;
            bool isPlaceHolder = false;
            LinkedList<DocPart> list = new LinkedList<DocPart>();

            StringBuilder sb = new StringBuilder(512);

            char[] chars = template.ToCharArray();
            for (int i = 0; i < chars.Length; ++i)
            {
                char ch = chars[i];


                if (ch == '{')
                {
                    if (prevChar == '{')
                    {
                        if (sb.Length > 0)
                        {
                            list.AddLast(new DocPart { isPlaceHolder = false, value = sb.ToString() });
                            sb = new StringBuilder();
                        }
                        isPlaceHolder = true;
                    }
                }
                else if (isPlaceHolder && ch == '}')
                {
                    if (prevChar == '}')
                    {
                        list.AddLast(this.GetDocPart(sb.ToString()));
                        isPlaceHolder = false;
                        sb = new StringBuilder();
                    }
                }
                else if (isPlaceHolder && prevChar == '}')
                {
                    sb.Append(prevChar);
                    sb.Append(ch);
                }
                else if (!isPlaceHolder && prevChar == '{')
                {
                    sb.Append(prevChar);
                    sb.Append(ch);
                }
                else
                    sb.Append(ch);

                prevChar = ch;
            }

            if (sb.Length > 0)
                list.AddLast(new DocPart { isPlaceHolder = false, value = sb.ToString() });

            return list;
        }

        public IEnumerable<DocPart> DocParts
        {
            get
            {
                return this._docParts;
            }
        }

        public void ProcessParts(Action<DocPart>  fn_partsHandler)
        {
            var parts = this.DocParts.ToList();
            parts.ForEach((part) =>
            {
                fn_partsHandler(part);
            });
        }
    }
}

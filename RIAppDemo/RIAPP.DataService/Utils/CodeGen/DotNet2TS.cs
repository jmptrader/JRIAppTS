using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Utils
{
    public class NewTypeArgs : EventArgs
    {
        public readonly Type t;
        public NewTypeArgs(Type t)
        {
            this.t = t;
        }
    }

    public class DotNet2TS
    {
        //a container for available services (something like dependency injection container)
        private IServiceContainer _serviceContainer;
        //maps type name to its definition
        private Dictionary<string, string> _tsTypes = new Dictionary<string, string>();

        public DotNet2TS(IServiceContainer serviceContainer)
        {
            this._serviceContainer = serviceContainer;
        }

        protected internal IServiceContainer ServiceContainer
        {
            get
            {
                return this._serviceContainer;
            }
        }

        public event EventHandler<NewTypeArgs> newClientTypeAdded;

        public string GetTSTypeName(Type t)
        {
            bool isArray = false;
            bool isEnumerable= false;
            bool isEnum = false;
            string res = "any";
            try
            {
               
                if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                {
                    t = t.GetGenericArguments().First();
                    isEnumerable= true;
                }
                else if (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(List<>))
                {
                    t = t.GetGenericArguments().First();
                    isEnumerable = true;
                }
                else if (t.IsArray)
                {
                    isEnumerable = true;
                    t = t.GetElementType();
                }
                else if (t != typeof(System.String) && typeof(System.Collections.IEnumerable).IsAssignableFrom(t))
                {
                    isEnumerable = true;
                    return "any[]";
                }

                if (t.IsEnum)
                {
                    isEnum = true;
                }

                DataType dtype = this._serviceContainer.ValueConverter.DataTypeFromType(t, out isArray);
                res = DotNet2TS.GetTSTypeNameFromDataType(dtype);
                if (isArray || isEnumerable)
                    res = string.Format("{0}[]", res);
                return res;
            }
            catch(UnsupportedTypeException)
            {
                //complex type
                return this.GetTsComplexTypeName(t, isArray, isEnumerable, isEnum);
            }
        }

        protected internal string GetTsComplexTypeName(Type t, bool isArray, bool isEnumerable, bool isEnum)
        {
            string res = "any";
            ExtendsAttribute extendsAttr = null;
            TypeNameAttribute typeNameAttr = null;
            string typeName = isEnum ? t.Name : string.Format("I{0}", t.Name);
            typeNameAttr = t.GetCustomAttributes(typeof(TypeNameAttribute), false).OfType<TypeNameAttribute>().FirstOrDefault();
            if (typeNameAttr != null)
                typeName = typeNameAttr.Name;
            if (!isEnum)
            {
                extendsAttr = t.GetCustomAttributes(typeof(ExtendsAttribute), false).OfType<ExtendsAttribute>().FirstOrDefault();
                StringBuilder extendsSb = null;
                if (extendsAttr != null && extendsAttr.InterfaceNames.Length > 0)
                {
                    extendsSb = new StringBuilder("extends ");
                    bool isFirst = true;
                    foreach (string intfName in extendsAttr.InterfaceNames)
                    {
                        if (!isFirst)
                            extendsSb.Append(", ");
                        extendsSb.Append(intfName);
                        isFirst = false;
                    }
                }
                res = this.GetTSInterface(t, typeName, extendsSb == null ? null : extendsSb.ToString());
            }
            else
            {
                res = GetTSEnum(t, typeName);
            }

            if (isArray || isEnumerable)
                return string.Format("{0}[]", typeName);
            else
                return typeName;
        }

        protected internal static void addComment(StringBuilder sb, string comment)
        {
            sb.AppendLine("/*");
            sb.Append("\t");
            sb.AppendLine(comment);
            sb.AppendLine("*/");
        }

        public bool IsTypeNameRegistered(string name)
        {
            return this._tsTypes.ContainsKey(name);
        }

        /// <summary>
        /// converts object to TS interface declaration
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        protected internal string GetTSInterface(Type t, string typeName, string extends)
        {
            if (t == typeof(Type))
                throw new ArgumentException("Can not generate interface for a System.Type");

            string name = typeName;
            if (string.IsNullOrEmpty(typeName))
                name = this.GetTSTypeName(t);
            if (this._tsTypes.ContainsKey(name))
                return this._tsTypes[name];

            var commentAttr = t.GetCustomAttributes(typeof(CommentAttribute), false).OfType<CommentAttribute>().FirstOrDefault();

            StringBuilder sb = new StringBuilder();
            if (commentAttr != null && !string.IsNullOrWhiteSpace(commentAttr.Text))
            {
                DotNet2TS.addComment(sb, commentAttr.Text);
            }
            sb.AppendFormat("export interface {0}", name);
            if (!string.IsNullOrWhiteSpace(extends))
            {
                sb.Append(" ");
                sb.Append(extends);
            }
            sb.AppendLine();
            sb.AppendLine("{");
            var objProps = t.GetProperties();
            Array.ForEach(objProps, (propInfo) =>
            {
                sb.AppendFormat("\t{0}:{1};", propInfo.Name, this.GetTSTypeName(propInfo.PropertyType));
                sb.AppendLine();
            }
            );
            sb.AppendLine("}");
            this._tsTypes.Add(name, sb.ToString());
            if (this.newClientTypeAdded != null)
            {
                this.newClientTypeAdded(this, new NewTypeArgs(t)); 
            }
            return this._tsTypes[name];
        }

        /// <summary>
        /// converts object to TS enum
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        protected internal string GetTSEnum(Type t, string typeName)
        {
            string name = typeName;
            if (string.IsNullOrEmpty(typeName))
                name = this.GetTSTypeName(t);
            if (this._tsTypes.ContainsKey(name))
                return this._tsTypes[name];

            CommentAttribute commentAttr = t.GetCustomAttributes(typeof(CommentAttribute), false).OfType<CommentAttribute>().FirstOrDefault();

            StringBuilder sb = new StringBuilder();
            if (commentAttr != null && !string.IsNullOrWhiteSpace(commentAttr.Text))
            {
                DotNet2TS.addComment(sb, commentAttr.Text);
            }
            sb.AppendFormat("export enum {0}", name);
            sb.AppendLine();
            sb.AppendLine("{");
            var enumVals = Enum.GetValues(t).Cast<int>().ToArray();
            bool isFirst = true;
            Array.ForEach(enumVals, (val) =>
            {
                if (!isFirst)
                    sb.AppendLine(",");
                string valname = Enum.GetName(t, val);
                sb.AppendFormat("\t{0}={1}", valname,val);
                isFirst = false;
            }
            );
            sb.AppendLine();
            sb.AppendLine("}");
            this._tsTypes.Add(name, sb.ToString());
            return this._tsTypes[name];
        }

        public string GetInterfaceDeclarations()
        {
            var vals = this._tsTypes.Values;
            StringBuilder sb = new StringBuilder(4096);
            foreach (string str in vals)
            {
                sb.Append(str);
                sb.AppendLine();
            }
            return sb.ToString().TrimEnd('\r','\n');
        }

        public static string GetTSTypeNameFromDataType(DataType dataType)
        {
            string fieldType = "any";
            switch (dataType)
            {
                case DataType.Binary:
                    fieldType = "number[]";
                    break;
                case DataType.Bool:
                    fieldType = "boolean";
                    break;
                case DataType.DateTime:
                case DataType.Date:
                case DataType.Time:
                    fieldType = "Date";
                    break;
                case DataType.Integer:
                case DataType.Decimal:
                case DataType.Float:
                    fieldType = "number";
                    break;
                case DataType.Guid:
                case DataType.String:
                    fieldType = "string";
                    break;
            }
            return fieldType;
        }

        public DataType DataTypeFromDotNetType(Type type, out bool isArray)
        {
            return this._serviceContainer.ValueConverter.DataTypeFromType(type, out isArray);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;
using System.Threading.Tasks;


namespace RIAPP.DataService.Utils
{
    public class TypeScriptHelper
    {
        MetadataResult _metadata;
        List<Type> _clientTypes;
        StringBuilder _sb = new StringBuilder(4096);
        private DotNet2TS _dotNet2TS;
        private IServiceContainer _serviceContainer;
        public static string toCamelCase(string str)
        {
            return str.Length > 1 ? str.Substring(0, 1).ToLower() + str.Substring(1, str.Length - 1) : str.ToLower();
        }

        public TypeScriptHelper(IServiceContainer serviceContainer, MetadataResult metadata, IEnumerable<Type> clientTypes)
        {
            if (serviceContainer == null)
                throw new ArgumentException("converter parameter must not be null", "serviceContainer");
            this._serviceContainer = serviceContainer;
            if (metadata == null)
                throw new ArgumentException("metadata parameter must not be null", "metadata");
            this._metadata = metadata;
            this._clientTypes = new List<Type>(clientTypes==null?Enumerable.Empty<Type>():clientTypes);
        }

        void _dotnet2TS_newClientTypeAdded(object sender, NewTypeArgs e)
        {
            if (!this._clientTypes.Contains(e.t))
            {
                this._clientTypes.Add(e.t);
            }
        }

        private void WriteString(string str)
        {
            this._sb.Append(str);
        }

        private void WriteStringLine(string str)
        {
            this._sb.AppendLine(str);
        }

        private void WriteLine()
        {
            this._sb.AppendLine();
        }

        private static void addComment(StringBuilder sb, string comment)
        {
            sb.AppendLine(@"/*");
            sb.AppendLine(comment);
            sb.AppendLine("*/");
            sb.AppendLine();
        }

        public string CreateTypeScript(string comment=null)
        {
            if (this._dotNet2TS != null)
            {
                this._dotNet2TS.newClientTypeAdded -= _dotnet2TS_newClientTypeAdded;
            }
            this._dotNet2TS = new DotNet2TS(this._serviceContainer);
            this._dotNet2TS.newClientTypeAdded += _dotnet2TS_newClientTypeAdded;
            _sb.Length = 0;
            if (!string.IsNullOrWhiteSpace(comment))
            {
                TypeScriptHelper.addComment(_sb, comment);
            }
            this.WriteStringLine(@"import collMOD = RIAPP.MOD.collection;");
            this.WriteStringLine(@"import dbMOD = RIAPP.MOD.db;");
            this.WriteLine();

            this.processMethodArgs();
            string isvcMethods = this.createISvcMethods();

            //create typed Lists and Dictionaries
            string listTypes = this.createClientTypes();
            //get interface declarations for all client types
            string sbInterfaceDefs = this._dotNet2TS.GetInterfaceDeclarations();

            if (!string.IsNullOrWhiteSpace(sbInterfaceDefs))
            {
                this.WriteStringLine(@"//******BEGIN INTERFACE REGION******");
                this.WriteStringLine(sbInterfaceDefs);
                this.WriteStringLine(@"//******END INTERFACE REGION******");
                this.WriteLine();
            }
            if (!string.IsNullOrWhiteSpace(isvcMethods))
            {
                this.WriteStringLine(isvcMethods);
                this.WriteLine();
            }
            if (!string.IsNullOrWhiteSpace(listTypes))
            {
                this.WriteStringLine(@"//******BEGIN LISTS REGION******");
                this.WriteStringLine(listTypes);
                this.WriteStringLine(@"//******END LISTS REGION******");
                this.WriteLine();
            }

          //this.WriteStringLine(this.createQueryNames());

            ComplexTypeBuilder ctbuilder = new ComplexTypeBuilder(this._dotNet2TS);
            this._metadata.dbSets.ForEach((dbSetInfo) =>
            {
                dbSetInfo.fieldInfos.ForEach((fieldInfo) =>
                {
                    if (fieldInfo.fieldType == FieldType.Object)
                    {
                        ctbuilder.CreateComplexType(dbSetInfo, fieldInfo, 0);
                    }
                });
            });

            string complexTypes = ctbuilder.GetComplexTypes();
            if (!string.IsNullOrWhiteSpace(complexTypes))
            {
                this.WriteStringLine(@"//******BEGIN COMPLEX TYPES REGION*****");
                this.WriteStringLine(complexTypes);
                this.WriteStringLine(@"//******END COMPLEX TYPES REGION******");
                this.WriteLine();
            }

            this._metadata.dbSets.ForEach((dbSetInfo) =>
            {
                this.WriteStringLine(this.createEntityType(dbSetInfo));
                this.WriteLine();
                this.WriteStringLine(this.createDbSetType(dbSetInfo));
                this.WriteLine();
            });

            this.WriteStringLine(this.createIAssocs());
            this.WriteLine();
            this.WriteStringLine(this.createDbContextType());
            this.WriteLine();
            return _sb.ToString();
        }

        private string createDbSetProps()
        {
            var sb = new StringBuilder(512);
            this._metadata.dbSets.ForEach((dbSetInfo) =>
            {
                var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
                sb.AppendFormat("\tget {0}() {{ return <{1}>this.getDbSet(\"{0}\"); }}", dbSetInfo.dbSetName,dbSetType);
                sb.AppendLine();
            });
            return sb.ToString();
        }

        private string createIAssocs()
        {
            var sb = new StringBuilder(512);
            sb.AppendLine("export interface IAssocs");
            sb.AppendLine("{");
            this._metadata.associations.ForEach((assoc) =>
            {
                sb.AppendFormat("\tget{0}: {1};", assoc.name, "()=> dbMOD.Association");
                sb.AppendLine();
            });
            sb.AppendLine("}");
            return sb.ToString();
        }

        private string _CreateParamSignature(ParamMetadata paramInfo)
        {
            return string.Format("{0}{1}: {2}{3};", paramInfo.name, paramInfo.isNullable ? "?" : "", (paramInfo.dataType == DataType.None ? this._dotNet2TS.GetTSTypeName(paramInfo.ParameterType) : DotNet2TS.GetTSTypeNameFromDataType(paramInfo.dataType)), (paramInfo.dataType != DataType.None && paramInfo.isArray) ? "[]" : "");
        }

        private void processMethodArgs()
        {
            this._metadata.methods.ForEach((methodInfo) =>
            {
                if (methodInfo.parameters.Count() > 0)
                {
                    methodInfo.parameters.ForEach((paramInfo) =>
                    {
                        //if this is complex type parse parameter to create its typescript interface
                        if (paramInfo.dataType == DataType.None) 
                            this._dotNet2TS.GetTSTypeName(paramInfo.ParameterType);
                    });
                }
            });
        }

        private string createISvcMethods()
        {
            var sbISvcMeth = new StringBuilder(512);
            sbISvcMeth.AppendLine("export interface ISvcMethods");
            sbISvcMeth.AppendLine("{");
            StringBuilder sbArgs = new StringBuilder(255);
            this._metadata.methods.ForEach((methodInfo) =>
            {
                if (!methodInfo.isQuery)
                {
                    sbArgs.Length = 0;
                    if (methodInfo.parameters.Count() > 0)
                    {
                        sbArgs.AppendLine("(args: {");
                        methodInfo.parameters.ForEach((paramInfo) =>
                        {
                            sbArgs.Append("\t\t");
                            sbArgs.AppendFormat(this._CreateParamSignature(paramInfo));
                            sbArgs.AppendLine();
                        });
                        if (methodInfo.methodResult)
                        {
                            sbArgs.Append("\t}) => RIAPP.IPromise<");
                            sbArgs.Append(this._dotNet2TS.GetTSTypeName(MetadataHelper.RemoveTaskFromType(methodInfo.methodInfo.ReturnType)));
                            sbArgs.Append(">");
                        }
                        else
                        {
                            sbArgs.Append("\t}) => RIAPP.IVoidPromise");
                        }
                    }
                    else
                    {
                        if (methodInfo.methodResult)
                        {
                            sbArgs.Append("() => RIAPP.IPromise<");
                            sbArgs.Append(this._dotNet2TS.GetTSTypeName(methodInfo.methodInfo.ReturnType));
                            sbArgs.Append(">");
                        }
                        else
                        {
                            sbArgs.Append("() => RIAPP.IVoidPromise");
                        }
                    }

                    sbISvcMeth.AppendFormat("\t{0}: {1};", methodInfo.methodName, sbArgs.ToString());
                    sbISvcMeth.AppendLine();
                }
            });
            sbISvcMeth.AppendLine("}");
            return sbISvcMeth.ToString().TrimEnd('\r','\n');
        }

        private string createClientTypes()
        {
            var sb = new StringBuilder(1024);
            for (int i = 0; i< this._clientTypes.Count();++i)
            {
                Type type = this._clientTypes[i];
                sb.Append(this.createClientType(type));
            }

            return sb.ToString().TrimEnd('\r','\n');
        }

        private string createDictionary(string name, string keyName, string itemName, string aspectName, string interfaceName, string properties, List<System.Reflection.PropertyInfo> propList)
        {
            var sbDict = new StringBuilder(512);
            var pkProp = propList.Where((propInfo) => keyName == propInfo.Name).SingleOrDefault();
            if (pkProp == null)
                throw new Exception(string.Format("Dictionary item does not have a property with a name {0}", keyName));
            string pkVals = toCamelCase(pkProp.Name) + ": " + this._dotNet2TS.GetTSTypeName(pkProp.PropertyType);


            (new TemplateParser("Dictionary.txt")).ProcessParts((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sbDict.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "DICT_NAME":
                            sbDict.Append(name);
                            break;
                        case "ITEM_TYPE_NAME":
                            sbDict.Append(itemName);
                            break;
                        case "INTERFACE_NAME":
                            sbDict.Append(interfaceName);
                            break;
                        case "ASPECT_NAME":
                            sbDict.Append(aspectName);
                            break;
                        case "KEY_NAME":
                            sbDict.Append(keyName);
                            break;
                        case "PROPS":
                            {
                                sbDict.Append(properties);
                            }
                            break;
                        case "PK_VALS":
                            sbDict.Append(pkVals);
                            break;
                    }
                }
            });
            return sbDict.ToString();
        }

        private string createList(string name, string itemName, string aspectName,  string interfaceName, string properties)
        {
            var sbList = new StringBuilder(512);

            (new TemplateParser("List.txt")).ProcessParts((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sbList.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "LIST_NAME":
                            sbList.Append(name);
                            break;
                        case "ITEM_TYPE_NAME":
                            sbList.Append(itemName);
                            break;
                        case "INTERFACE_NAME":
                            sbList.Append(interfaceName);
                            break;
                        case "ASPECT_NAME":
                            sbList.Append(aspectName);
                            break;
                        case "PROP_INFOS":
                            {
                                sbList.Append(properties);
                            }
                            break;
                    }
                }
            });
            
            return sbList.ToString();
        }

        private string createListItem(string itemName, string aspectName,  string interfaceName, List<System.Reflection.PropertyInfo> propInfos)
        {
            var sbProps = new StringBuilder(512);
            propInfos.ForEach((propInfo) =>
            {
                sbProps.AppendLine(string.Format("\tget {0}():{1} {{ return <{1}>this._aspect._getProp('{0}'); }}", propInfo.Name, this._dotNet2TS.GetTSTypeName(propInfo.PropertyType)));
                sbProps.AppendLine(string.Format("\tset {0}(v:{1}) {{ this._aspect._setProp('{0}', v); }}", propInfo.Name, this._dotNet2TS.GetTSTypeName(propInfo.PropertyType)));
            });

            var sbListItem = new StringBuilder(512);

            (new TemplateParser("ListItem.txt")).ProcessParts((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sbListItem.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "LIST_ITEM_NAME":
                            sbListItem.Append(itemName);
                            break;
                        case "INTERFACE_NAME":
                            sbListItem.Append(interfaceName);
                            break;
                        case "ASPECT_NAME":
                            sbListItem.Append(aspectName);
                            break;
                        case "ITEM_PROPS":
                            {
                                sbListItem.Append(sbProps.ToString());
                            }
                            break;
                    }
                }
            });

            sbListItem.AppendLine();
            return sbListItem.ToString();
        }

        private string createClientType(Type type)
        {
            var dictAttr = type.GetCustomAttributes(typeof(DictionaryAttribute), false).OfType<DictionaryAttribute>().FirstOrDefault();
            var listAttr = type.GetCustomAttributes(typeof(ListAttribute), false).OfType<ListAttribute>().FirstOrDefault();

            if (dictAttr != null && dictAttr.KeyName == null)
                throw new ArgumentException("DictionaryAttribute KeyName property must not be null");
            var sb = new StringBuilder(512);
            string dictName = null; string listName = null;
            if (dictAttr != null)
                dictName = dictAttr.DictionaryName == null ? string.Format("{0}Dict", type.Name) : dictAttr.DictionaryName;
            if (listAttr != null)
                listName = listAttr.ListName == null ? string.Format("{0}List", type.Name) : listAttr.ListName;
            bool isListItem = dictAttr != null || listAttr != null;
            string interfaceName = this._dotNet2TS.GetTSTypeName(type);
            
            //can return here if no need to create Dictionary or List
            if (!type.IsClass || !isListItem)
                return sb.ToString();

            string listItemName = string.Format("{0}ListItem", type.Name);
            string itemAspectName = string.Format("{0}Aspect", listItemName);
            var propInfos = type.GetProperties().ToList();
            string list_properties = string.Empty;

            #region Define fn_Properties
            Func<List<System.Reflection.PropertyInfo>, string> fn_Properties = (props) =>
            {
                var sbProps = new StringBuilder(256);

                sbProps.Append("[");
                bool isFirst = true;
                bool isArray = false;

                props.ForEach((propInfo) =>
                {
                    if (!isFirst)
                        sbProps.Append(",");
                    DataType dataType = DataType.None;
                    try
                    {
                        dataType = this._dotNet2TS.DataTypeFromDotNetType(propInfo.PropertyType, out isArray);
                        if (isArray)
                            dataType = DataType.None;
                    }
                    catch (UnsupportedTypeException)
                    {
                        dataType = DataType.None;
                    }
                    sbProps.Append("{");
                    sbProps.Append(string.Format("name:'{0}',dtype:{1}", propInfo.Name, (int)dataType));
                    sbProps.Append("}");
                    isFirst = false;
                });
                sbProps.Append("]");
                return sbProps.ToString();
            };
            #endregion

            if (dictAttr != null || listAttr != null)
            {
                string listItem = this.createListItem(listItemName, itemAspectName, interfaceName, propInfos);
                sb.AppendLine(listItem);

                list_properties = fn_Properties(propInfos);
            }

            if (dictAttr != null)
            {
                sb.AppendLine(this.createDictionary(dictName, dictAttr.KeyName, listItemName, itemAspectName, interfaceName, list_properties, propInfos));
                sb.AppendLine();
            }

            if (listAttr != null)
            {
                sb.AppendLine(this.createList(listName, listItemName, itemAspectName, interfaceName, list_properties));
                sb.AppendLine();
            }


            return sb.ToString();
        }

        /*
        private string createQueryNames()
        {
            var sb = new StringBuilder(256);
            sb.AppendLine("export var QUERY_NAME =");
            sb.Append("{");
            bool isFirst = true;
            this._metadata.methods.ForEach((methodInfo) =>
            {
                if (methodInfo.isQuery)
                {
                    if (!isFirst)
                    {
                        sb.Append(",");
                        sb.AppendLine();
                    }
                    sb.AppendFormat("\t{0}: '{0}'", methodInfo.methodName);
                  
                    isFirst = false;
                }
            });
            sb.AppendLine();
            sb.AppendLine("};");
            return sb.ToString();
        }
        */

        private string createDbSetQueries(DbSetInfo dbSetInfo)
        {
            var sb = new StringBuilder(256);
            var sbArgs = new StringBuilder(256);
            var selected = this._metadata.methods.Where((m) => m.isQuery && MetadataHelper.RemoveTaskFromType(m.methodInfo.ReturnType).GetGenericArguments().First() == dbSetInfo.EntityType).ToList();
            selected.ForEach((methodInfo) =>
            {
                sbArgs.Length = 0;
                sbArgs.AppendLine("args?: {");
                int cnt = 0;
                methodInfo.parameters.ForEach((paramInfo) =>
                {
                    sbArgs.Append("\t\t");
                    sbArgs.AppendFormat(this._CreateParamSignature(paramInfo));
                    sbArgs.AppendLine();
                    ++cnt;
                });
                sbArgs.Append("\t}");
                if (cnt == 0)
                {
                    sbArgs.Length = 0;
                }
                sb.AppendFormat("\tcreate{0}Query({1})", methodInfo.methodName, sbArgs.ToString());
                sb.AppendLine();
                sb.Append("\t{");
                sb.AppendLine();
                if (sbArgs.Length > 0)
                {
                    sb.AppendFormat("\t\tvar query = this.createQuery('{0}');", methodInfo.methodName);
                    sb.AppendLine();
                    sb.AppendLine("\t\tquery.params = args;");
                    sb.AppendLine("\t\treturn query;");
                }
                else
                {
                    sb.AppendFormat("\t\treturn this.createQuery('{0}');", methodInfo.methodName);
                    sb.AppendLine();
                }
                sb.AppendLine("\t}");
            });
            return sb.ToString();
        }

        private string createCalcFields(DbSetInfo dbSetInfo)
        {
            var entityType = GetEntityTypeName(dbSetInfo.dbSetName);
            var sb = new StringBuilder(256);
            dbSetInfo.fieldInfos.ForEach((fieldInfo) =>
            {
                this._serviceContainer.DataHelper.ForEachFieldInfo("", fieldInfo, (fullName, f) =>
                {
                    if (f.fieldType == FieldType.Calculated)
                    {
                        sb.AppendFormat("\tdefine{0}Field(getFunc: (item: {1}) => {2})", fullName.Replace('.', '_'), entityType, this.GetFieldDataType(f));
                        sb.Append(" { ");
                        sb.AppendFormat("this._defineCalculatedField('{0}', getFunc);", fullName);
                        sb.Append(" }");
                        sb.AppendLine();
                    }
                });
            });
            return sb.ToString();
        }

        private string createDbContextType()
        {
            var sb = new StringBuilder(512);
            string[] dbSetNames = this._metadata.dbSets.Select(d => d.dbSetName).ToArray();
            var sbCreateDbSets = new StringBuilder(512);
            this._metadata.dbSets.ForEach((dbSetInfo) =>
            {
                var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
                sbCreateDbSets.AppendFormat("\t\tthis._createDbSet(\"{0}\",{1});", dbSetInfo.dbSetName, dbSetType);
                sbCreateDbSets.AppendLine();
            });

            (new TemplateParser("DbContext.txt")).ProcessParts((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sb.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "DBSETS_NAMES":
                            sb.Append(this._serviceContainer.Serializer.Serialize(dbSetNames));
                            break;
                        case "DBSETS_PROPS":
                            sb.Append(this.createDbSetProps());
                            break;
                        case "DBSETS":
                            sb.Append(sbCreateDbSets);
                            break;
                        case "TIMEZONE":
                            sb.Append(this._metadata.serverTimezone.ToString());
                            break;
                        case "ASSOCIATIONS":
                            sb.Append(this._serviceContainer.Serializer.Serialize(this._metadata.associations));
                            break;
                        case "METHODS":
                            sb.Append(this._serviceContainer.Serializer.Serialize(this._metadata.methods));
                            break;
                    }
                }
            });
            return sb.ToString();
        }

        private string createDbSetType(DbSetInfo dbSetInfo)
        {
            var sb = new StringBuilder(512);
            var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
            var entityName = GetEntityName(dbSetInfo.dbSetName);
            var entityType = GetEntityTypeName(dbSetInfo.dbSetName);
            var entityInterfaceName = GetEntityInterfaceName(dbSetInfo.dbSetName);
            var childAssoc = this._metadata.associations.Where(assoc => assoc.childDbSetName == dbSetInfo.dbSetName).ToList();
            var parentAssoc = this._metadata.associations.Where(assoc => assoc.parentDbSetName == dbSetInfo.dbSetName).ToList();
            var fieldInfos = dbSetInfo.fieldInfos;
            
            var pkFields = dbSetInfo.GetPKFields();
            string pkVals = "";
            foreach (var pkField in pkFields)
            {
                if (!string.IsNullOrEmpty(pkVals))
                    pkVals += ", ";
                pkVals += toCamelCase(pkField.fieldName) + ": " + this.GetFieldDataType(pkField);
            }

            (new TemplateParser("DbSet.txt")).ProcessParts((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sb.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "DBSET_NAME":
                            sb.Append(dbSetInfo.dbSetName);
                            break;
                        case "DBSET_TYPE":
                            sb.Append(dbSetType);
                            break;
                        case "ENTITY_NAME":
                            sb.Append(entityName);
                            break;
                        case "ENTITY_TYPE":
                            sb.Append(entityType);
                            break;
                        case "ENTITY_INTERFACE":
                            {
                                sb.Append(entityInterfaceName);
                            }
                            break;
                        case "DBSET_INFO":
                            {
                                dbSetInfo._fieldInfos = null;
                                sb.Append(this._serviceContainer.Serializer.Serialize(dbSetInfo));
                                dbSetInfo._fieldInfos = fieldInfos;
                            }
                            break;
                        case "FIELD_INFOS":
                            {
                                sb.Append(this._serviceContainer.Serializer.Serialize(dbSetInfo.fieldInfos));
                            }
                            break;
                        case "CHILD_ASSOC":
                            sb.Append(this._serviceContainer.Serializer.Serialize(childAssoc));
                            break;
                        case "PARENT_ASSOC":
                            sb.Append(this._serviceContainer.Serializer.Serialize(parentAssoc));
                            break;
                        case "QUERIES":
                            sb.Append(this.createDbSetQueries(dbSetInfo));
                            break;
                        case "CALC_FIELDS":
                            sb.Append(this.createCalcFields(dbSetInfo));
                            break;
                        case "PK_VALS":
                            sb.Append(pkVals);
                            break;
                    }
                }
            });
            return sb.ToString();
        }

        private string createEntityType(DbSetInfo dbSetInfo)
        {
            var sb = new StringBuilder(512);
            var dbSetType = GetDbSetTypeName(dbSetInfo.dbSetName);
            var entityName = GetEntityName(dbSetInfo.dbSetName);
            var entityInterfaceName = GetEntityInterfaceName(dbSetInfo.dbSetName);
            var entityType = GetEntityTypeName(dbSetInfo.dbSetName);
            var fieldInfos = dbSetInfo.fieldInfos;
            var sbFields = new StringBuilder(512);
            var sbFields2 = new StringBuilder(512);
            var sbFieldsDef = new StringBuilder();
            var sbFieldsInit = new StringBuilder();

            if (this._dotNet2TS.IsTypeNameRegistered(entityType))
                throw new ApplicationException(string.Format("Names collision. Name '{0}' can not be used for an entity type's name because this name is used for a client's type.", entityInterfaceName));

            Action<Field> AddCalculatedField = (Field f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}(): {1} {{ return this._aspect._getCalcFieldVal('{0}'); }}", f.fieldName, dataType);
                sbFields.AppendLine();

                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };

            Action<Field> AddNavigationField = (Field f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}(): {1} {{ return this._aspect._getNavFieldVal('{0}'); }}", f.fieldName, dataType);
                sbFields.AppendLine();
                //no writable properties to ParentToChildren navigation fields
                if (!dataType.EndsWith("[]"))
                {
                    sbFields.AppendFormat("\tset {0}(v: {1}) {{ this._aspect._setNavFieldVal('{0}',v); }}", f.fieldName, dataType);
                    sbFields.AppendLine();
                }

                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };


            Action<Field> AddComplexTypeField = (Field f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}(): {1} {{ if (!this._{0}) {{this._{0} = new {1}('{0}', this._aspect);}} return this._{0}; }}", f.fieldName, dataType);
                sbFields.AppendLine();
                sbFieldsDef.AppendFormat("\tprivate _{0}: {1};", f.fieldName, dataType);
                sbFieldsDef.AppendLine();
                sbFieldsInit.AppendFormat("\t\tthis._{0} = null;", f.fieldName);
                sbFieldsInit.AppendLine();
                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };

            Action<Field> AddSimpleField = (Field f) =>
            {
                string dataType = this.GetFieldDataType(f);
                sbFields.AppendFormat("\tget {0}(): {1} {{ return this._aspect._getFieldVal('{0}'); }}", f.fieldName, dataType);
                sbFields.AppendLine();
                if (!f.isReadOnly)
                {
                    sbFields.AppendFormat("\tset {0}(v: {1}) {{ this._aspect._setFieldVal('{0}',v); }}", f.fieldName, dataType);
                    sbFields.AppendLine();
                }

                sbFields2.AppendFormat("\t{0}: {1};", f.fieldName, dataType);
                sbFields2.AppendLine();
            };

            fieldInfos.ForEach((fieldInfo) =>
            {
                if (fieldInfo.fieldType == FieldType.Calculated)
                {
                    AddCalculatedField(fieldInfo);
                }
                else if (fieldInfo.fieldType == FieldType.Navigation)
                {
                    AddNavigationField(fieldInfo);
                }
                else if (fieldInfo.fieldType == FieldType.Object)
                {
                    AddComplexTypeField(fieldInfo);
                }
                else
                {
                    AddSimpleField(fieldInfo);
                }
            });

            (new TemplateParser("Entity.txt")).ProcessParts((part) =>
            {
                if (!part.isPlaceHolder)
                {
                    sb.Append(part.value);
                }
                else
                {
                    switch (part.value)
                    {
                        case "DBSET_NAME":
                            sb.Append(dbSetInfo.dbSetName);
                            break;
                        case "DBSET_TYPE":
                            sb.Append(dbSetType);
                            break;
                        case "ENTITY_NAME":
                            sb.Append(entityName);
                            break;
                        case "ENTITY_TYPE":
                            sb.Append(entityType);
                            break;
                        case "ENTITY_INTERFACE":
                            sb.Append(entityInterfaceName);
                            break;
                        case "ENTITY_FIELDS":
                            sb.Append(sbFields.ToString());
                            break;
                        case "INTERFACE_FIELDS":
                            sb.Append(sbFields2.ToString());
                            break;
                        case "FIELDS_DEF":
                            sb.Append(sbFieldsDef.ToString());
                            break;
                        case "FIELDS_INIT":
                            sb.Append(sbFieldsInit.ToString());
                            break;
                    }
                }
            });
            return sb.ToString();
        }
           
        private string GetFieldDataType(Field fieldInfo)
        {
            string fieldName = fieldInfo.fieldName;
            string fieldType = "any";
            DataType dataType = fieldInfo.dataType;

            if (fieldInfo.fieldType == FieldType.Navigation)
            {
                fieldType = fieldInfo._TypeScriptDataType;
            }
            else if (fieldInfo.fieldType == FieldType.Object)
            {
                fieldType = fieldInfo._TypeScriptDataType;
            }
            else
            {
                fieldType = DotNet2TS.GetTSTypeNameFromDataType(dataType);
            }
            return fieldType;
        }

        public static string GetDbSetTypeName(string dbSetName)
        {
            return string.Format("{0}Db", dbSetName);
        }

        public static string GetEntityTypeName(string dbSetName)
        {
            return string.Format("{0}", dbSetName);
        }

        public static string GetEntityName(string dbSetName)
        {
            return string.Format("{0}Entity",dbSetName);
        }

        public static string GetEntityInterfaceName(string dbSetName)
        {
            return string.Format("I{0}Entity", dbSetName);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.Xml.Linq;


namespace RIAPP.DataService.Types
{
    public class Metadata
    {
        private DBSetList _dbSets = new DBSetList();
        private AssocList _associations = new AssocList();

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        public DBSetList DbSets
        {
            get
            {
                return _dbSets;
            }
        }

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        public AssocList Associations
        {
            get
            {
                return _associations;
            }
        }

        private static readonly XNamespace NS_XAML_PRESENTATION = "http://schemas.microsoft.com/winfx/2006/xaml/presentation";
        private static readonly XNamespace NS_DATA = "clr-namespace:RIAPP.DataService.Types;assembly=RIAPP.DataService";
        private static readonly XNamespace NS_XAML = "http://schemas.microsoft.com/winfx/2006/xaml";


        public string ToXML()
        {
            XNamespace ns_dal = string.Format("clr-namespace:{0};assembly={1}",
                this.DbSets.Any() ? this.DbSets.First().EntityType.Namespace : this.GetType().Namespace,
                this.DbSets.Any() ? this.DbSets.First().EntityType.Assembly.GetName().Name : this.GetType().Assembly.GetName().Name);

            XElement xElement = new XElement(NS_DATA + "Metadata",
                new XAttribute(XNamespace.Xmlns + "x", NS_XAML.ToString()),
                new XAttribute(XNamespace.Xmlns + "data", NS_DATA.ToString()),
                new XAttribute(XNamespace.Xmlns + "dal", ns_dal.ToString()),
                new XAttribute(NS_XAML + "Key", "ResourceKey"),
                new XElement(NS_DATA + "Metadata.DbSets",
                from dbset in this.DbSets
                select new XElement(NS_DATA + "DbSetInfo",
                    new XAttribute("dbSetName", dbset.dbSetName),
                    dbset.isTrackChanges ? new XAttribute[] { new XAttribute("isTrackChanges", dbset.isTrackChanges) } : new XAttribute[0],
                    dbset.FetchSize != 1000 ? new XAttribute[] { new XAttribute("FetchSize", dbset.FetchSize) } : new XAttribute[0],
                    new XAttribute("enablePaging", dbset.enablePaging),
                    dbset.enablePaging ? new XAttribute[] { new XAttribute("pageSize", dbset.pageSize) } : new XAttribute[0],
                    new XAttribute("EntityType", string.Format("{{x:Type dal:{0}}}", dbset.EntityType.Name)),
                    new XElement(NS_DATA + "DbSetInfo.fieldInfos", _FieldsToXElements(dbset.fieldInfos)
                ))),
                new XElement(NS_DATA + "Metadata.Associations",
                    from assoc in this.Associations
                    select new XElement(NS_DATA + "Association", 
                        new XAttribute("name", assoc.name),
                        string.IsNullOrWhiteSpace(assoc.parentDbSetName) ? new XAttribute[0] : new XAttribute[] { new XAttribute("parentDbSetName", assoc.parentDbSetName) },
                        string.IsNullOrWhiteSpace(assoc.childDbSetName) ? new XAttribute[0] : new XAttribute[] { new XAttribute("childDbSetName", assoc.childDbSetName) },
                        string.IsNullOrWhiteSpace(assoc.childToParentName) ? new XAttribute[0] : new XAttribute[] { new XAttribute("childToParentName", assoc.childToParentName) },
                        string.IsNullOrWhiteSpace(assoc.parentToChildrenName) ? new XAttribute[0] : new XAttribute[] { new XAttribute("parentToChildrenName", assoc.parentToChildrenName) },
                        assoc.onDeleteAction == DeleteAction.NoAction ? new XAttribute[0] : new XAttribute[] { new XAttribute("onDeleteAction", assoc.onDeleteAction) },
                        new XElement(NS_DATA + "Association.fieldRels",
                               from fldRel in assoc.fieldRels
                               select new XElement(NS_DATA + "FieldRel",
                                   new XAttribute("parentField", fldRel.parentField),
                                   new XAttribute("childField", fldRel.childField)
                                   )
                               )
                        ))
            );

           string xml = xElement.ToString();
           return xml;
        }

        public static Metadata FromXML(string xml)
        {
            Metadata metadata = new Metadata();
            XDocument xdoc = XDocument.Parse(xml);
            XElement xmetadata = xdoc.Element(NS_DATA + "Metadata");
            XElement xdbSets = xmetadata.Element(NS_DATA + "Metadata.DbSets");
            if (xdbSets != null)
            {
                foreach (var xdbSet in xdbSets.Elements(NS_DATA + "DbSetInfo"))
                {
                    string xType = (string)xdbSet.Attribute("EntityType").Value;
                    Type _entityType = _GetTypeFromXType(xType, xdoc);

                    DbSetInfo dbSetInfo = new DbSetInfo()
                    {
                        dbSetName = (string)xdbSet.Attribute("dbSetName"),
                        EntityType = _entityType,
                        insertDataMethod = (string)xdbSet.Attribute("insertDataMethod"),
                        updateDataMethod = (string)xdbSet.Attribute("updateDataMethod"),
                        deleteDataMethod = (string)xdbSet.Attribute("deleteDataMethod"),
                        refreshDataMethod = (string)xdbSet.Attribute("refreshDataMethod"),
                        validateDataMethod = (string)xdbSet.Attribute("validateDataMethod")
                    };
                    if (xdbSet.Attributes("enablePaging").Any())
                        dbSetInfo.enablePaging = (bool)xdbSet.Attribute("enablePaging");
                    if (xdbSet.Attributes("pageSize").Any())
                        dbSetInfo.pageSize = (int)xdbSet.Attribute("pageSize");
                    if (xdbSet.Attributes("isTrackChanges").Any())
                        dbSetInfo.isTrackChanges = (bool)xdbSet.Attribute("isTrackChanges");
                    if (xdbSet.Attributes("FetchSize").Any())
                        dbSetInfo.FetchSize = (int)xdbSet.Attribute("FetchSize");
                    metadata.DbSets.Add(dbSetInfo);

                    XElement xFields = xdbSet.Element(NS_DATA + "DbSetInfo.fieldInfos");
                    IEnumerable<XElement> fields = xFields.Elements(NS_DATA + "Field");
                    dbSetInfo.fieldInfos.AddRange(_XElementsToFieldList(fields));
                }
            }

            XElement xAssocs = xmetadata.Element(NS_DATA + "Metadata.Associations");
            if (xAssocs != null)
            {
                foreach (var xAssoc in xAssocs.Elements(NS_DATA + "Association"))
                {
                    Association assoc = new Association() { 
                       name=(string)xAssoc.Attribute("name")
                    };
                    if (xAssoc.Attributes("parentDbSetName").Any())
                        assoc.parentDbSetName = (string)xAssoc.Attribute("parentDbSetName");
                    if (xAssoc.Attributes("childDbSetName").Any())
                        assoc.childDbSetName = (string)xAssoc.Attribute("childDbSetName");
                    if (xAssoc.Attributes("childToParentName").Any())
                        assoc.childToParentName = (string)xAssoc.Attribute("childToParentName");
                    if (xAssoc.Attributes("parentToChildrenName").Any())
                        assoc.parentToChildrenName = (string)xAssoc.Attribute("parentToChildrenName");
                    if (xAssoc.Attributes("onDeleteAction").Any())
                        assoc.onDeleteAction = (DeleteAction)Enum.Parse(typeof(DeleteAction), xAssoc.Attribute("onDeleteAction").Value);
                    XElement xFieldRels = xAssoc.Element(NS_DATA + "Association.fieldRels");
                    if (xFieldRels != null)
                    {
                        foreach (var xFieldRel in xFieldRels.Elements(NS_DATA + "FieldRel"))
                        {
                            FieldRel fldRel = new FieldRel()
                            {
                                parentField = (string)xFieldRel.Attribute("parentField"),
                                childField = (string)xFieldRel.Attribute("childField")
                            };
                            assoc.fieldRels.Add(fldRel);
                        }
                    }

                    metadata.Associations.Add(assoc);
                }
            }

            return metadata;
        }

        /// <summary>
        /// Helps to obtain XML for any class type in the form that are usable for the metadata
        /// </summary>
        /// <param name="classTypes"></param>
        /// <returns></returns>
        public static string ClassTypesToXML(IEnumerable<Type> classTypes)
        {
            classTypes = classTypes.Where(t => t.IsClass && !t.IsArray);
            Dictionary<Type, string> dic_types = new Dictionary<Type, string>();
            foreach (var classType in classTypes)
            {
                string ns_dal = string.Format("clr-namespace:{0};assembly={1}", classType.Namespace, classType.Assembly.GetName().Name);
                dic_types.Add(classType, ns_dal);
            }

            Dictionary<string, string> dic_ns_prefix = new Dictionary<string, string>();
            LinkedList<XAttribute> dal_ns_attributes = new LinkedList<XAttribute>();
            int i = 0;
            foreach (string ns in dic_types.Values)
            {
                if (!dic_ns_prefix.ContainsKey(ns))
                {
                    ++i;
                    string prefix = string.Format("dal{0}", i);
                    dic_ns_prefix.Add(ns, prefix);
                    dal_ns_attributes.AddLast(new XAttribute(XNamespace.Xmlns + prefix, ns));
                }
            }

            XElement xElement = new XElement(NS_DATA + "Metadata",
                new XAttribute(XNamespace.Xmlns + "x", NS_XAML.ToString()),
                new XAttribute(XNamespace.Xmlns + "data", NS_DATA.ToString()),
                dal_ns_attributes.ToArray(),
                new XAttribute(NS_XAML + "Key", "ResourceKey"),
                new XElement(NS_DATA + "Metadata.DbSets",
                from classType in classTypes
                select new XElement(NS_DATA + "DbSetInfo",
                    new XAttribute("dbSetName", classType.Name),
                    new XAttribute("enablePaging", true),
                    new XAttribute("pageSize", 25),
                    new XAttribute("EntityType", string.Format("{{x:Type {0}:{1}}}", dic_ns_prefix[dic_types[classType]], classType.Name)),
                    new XElement(NS_DATA + "DbSetInfo.fieldInfos", _PropsToXElements(classType.GetProperties(), 0)
                )))
                );

            return xElement.ToString();
        }

        public static string ClassTypeToXML(Type classType)
        {
            return ClassTypesToXML(new Type[] { classType });
        }

        #region Helper methods
        private const int MAX_DEPTH = 2;
        private static IEnumerable<XElement> _PropsToXElements(System.Reflection.PropertyInfo[] props, int level)
        {
            if (level > MAX_DEPTH)
                return Enumerable.Empty<XElement>();

            Func<Type, DataType> toDataType = (propType) =>
            {
                DataType res = DataType.None;
                bool isArray = false;
                try
                {
                    res = RIAPP.DataService.Utils.ValueConverter.DataTypeFromTypeCore(propType, out isArray);
                    if (isArray)
                        res = DataType.None;
                }
                catch(UnsupportedTypeException)
                {
                    res = DataType.None;
                }
                return res;
            };

            Func<Type, bool> isComplexType = (propType) =>
            {
                return propType.IsClass && propType != typeof(string) && !propType.IsArray && propType.GetProperties().Any();
            };

            return from prop in props
                   select new XElement(NS_DATA + "Field",
                           new XAttribute("fieldName", prop.Name),
                           new XAttribute("dataType", toDataType(prop.PropertyType)),
                           RIAPP.DataService.Utils.ValueConverter.IsNullableTypeCore(prop.PropertyType) || prop.PropertyType== typeof(string) ? new XAttribute[] { new XAttribute("isNullable", true) } : new XAttribute[0],
                           prop.SetMethod == null ? new XAttribute[] { new XAttribute("isReadOnly", true) } : new XAttribute[0],
                           isComplexType(prop.PropertyType) ? new XAttribute[] { new XAttribute("fieldType", FieldType.Object) } : new XAttribute[0],
                           isComplexType(prop.PropertyType) && level < MAX_DEPTH ? new XElement[] { new XElement(NS_DATA + "Field.nested", _PropsToXElements(prop.PropertyType.GetProperties(), level + 1)) } : new XElement[0]
                       );
        }

        private static IEnumerable<XElement> _FieldsToXElements(FieldsList fields)
        {
            return from fld in fields
                   select new XElement(NS_DATA + "Field",
                           new XAttribute("fieldName", fld.fieldName),
                           new XAttribute("dataType", fld.dataType),
                           fld.isPrimaryKey > 0 ? new XAttribute[] { new XAttribute("isPrimaryKey", fld.isPrimaryKey) } : new XAttribute[0],
                           fld.dataType == DataType.String ? new XAttribute[] { new XAttribute("maxLength", fld.maxLength) } : new XAttribute[0],
                           !fld.isNullable? new XAttribute[] { new XAttribute("isNullable", fld.isNullable) } : new XAttribute[0],
                           fld.isAutoGenerated ? new XAttribute[] { new XAttribute("isAutoGenerated", fld.isAutoGenerated) } : new XAttribute[0],
                           fld.allowClientDefault ? new XAttribute[] { new XAttribute("allowClientDefault", fld.allowClientDefault) } : new XAttribute[0],
                           !fld.isNeedOriginal ? new XAttribute[] { new XAttribute("isNeedOriginal", fld.isNeedOriginal) } : new XAttribute[0],
                           fld.isReadOnly ? new XAttribute[] { new XAttribute("isReadOnly", fld.isReadOnly) } : new XAttribute[0],
                           fld.fieldType != FieldType.None ? new XAttribute[] { new XAttribute("fieldType", fld.fieldType) } : new XAttribute[0],
                           fld.dateConversion != DateConversion.None ? new XAttribute[] { new XAttribute("dateConversion", fld.dateConversion) } : new XAttribute[0],
                           !string.IsNullOrWhiteSpace(fld.range) ? new XAttribute[] { new XAttribute("range", fld.range) } : new XAttribute[0],
                           !string.IsNullOrWhiteSpace(fld.regex) ? new XAttribute[] { new XAttribute("regex", fld.regex) } : new XAttribute[0],
                           !string.IsNullOrWhiteSpace(fld.dependentOn) ? new XAttribute[] { new XAttribute("dependentOn", fld.dependentOn) } : new XAttribute[0],
                           !fld.IsHasNestedFields() ? new XElement[0] : new XElement[] { new XElement(NS_DATA + "Field.nested", _FieldsToXElements(fld.nested)) }
                       );
        }

        private static FieldsList _XElementsToFieldList(IEnumerable<XElement> xFields)
        {
            FieldsList fields = new FieldsList();
            foreach (XElement xField in xFields)
            {
                Field field = new Field()
                {
                    fieldName = (string)xField.Attribute("fieldName")
                };
                if (xField.Attributes("isPrimaryKey").Any())
                    field.isPrimaryKey = (short)xField.Attribute("isPrimaryKey");
                if (xField.Attributes("dataType").Any())
                    field.dataType = (DataType)Enum.Parse(typeof(DataType), xField.Attribute("dataType").Value);
                if (xField.Attributes("maxLength").Any())
                    field.maxLength = (short)xField.Attribute("maxLength");
                if (xField.Attributes("isNullable").Any())
                    field.isNullable = (bool)xField.Attribute("isNullable");
                if (xField.Attributes("isReadOnly").Any())
                    field.isReadOnly = (bool)xField.Attribute("isReadOnly");
                if (xField.Attributes("isAutoGenerated").Any())
                    field.isAutoGenerated = (bool)xField.Attribute("isAutoGenerated");
                if (xField.Attributes("allowClientDefault").Any())
                    field.allowClientDefault = (bool)xField.Attribute("allowClientDefault");
                if (xField.Attributes("isNeedOriginal").Any())
                    field.isNeedOriginal = (bool)xField.Attribute("isNeedOriginal");
                if (xField.Attributes("dateConversion").Any())
                    field.dateConversion = (DateConversion)Enum.Parse(typeof(DateConversion), xField.Attribute("dateConversion").Value);
                if (xField.Attributes("fieldType").Any())
                    field.fieldType = (FieldType)Enum.Parse(typeof(FieldType), xField.Attribute("fieldType").Value);
                if (xField.Attributes("range").Any())
                    field.range = (string)xField.Attribute("range");
                if (xField.Attributes("regex").Any())
                    field.regex = (string)xField.Attribute("regex");
                if (xField.Attributes("dependentOn").Any())
                    field.dependentOn = (string)xField.Attribute("dependentOn");

                if (xField.Elements(NS_DATA + "Field.nested").Any())
                {
                    field.nested.AddRange(_XElementsToFieldList(xField.Element(NS_DATA + "Field.nested").Elements(NS_DATA + "Field")));
                }
                fields.Add(field);
            }
            return fields;
        }

        private static Type _GetTypeFromXType(string xType, XDocument xdoc)
        {
            if (!(xType.StartsWith("{") && xType.EndsWith("}")))
                throw new Exception(string.Format("Invalid EntityType attribute value: {0}", xType));
            string[] typeParts = xType.TrimStart('{').TrimEnd('}').Split(' ');
            if (typeParts.Length != 2)
                throw new Exception(string.Format("Invalid entity type: {0}", xType));
            string[] typeParts1 = typeParts[0].Split(':').Select(s => s.Trim()).ToArray();
            string[] typeParts2 = typeParts[1].Split(':').Select(s => s.Trim()).ToArray();

            XNamespace xaml_ns = xdoc.Root.GetNamespaceOfPrefix(typeParts1[0]);
            if (xaml_ns != NS_XAML)
                throw new Exception(string.Format("Can not get xaml namespace for xType: {0}", typeParts1[0]));
            if (typeParts1[1] != "Type")
                throw new Exception(string.Format("Invalid EntityType attribute value: {0}", xType));

            XNamespace xEntity_ns = xdoc.Root.GetNamespaceOfPrefix(typeParts2[0]);
            if (xEntity_ns == null)
            {
                throw new Exception(string.Format("Can not get clr namespace for the prefix: {0}", typeParts2[0]));
            }
            if (xEntity_ns.ToString().IndexOf("clr-namespace:") < 0)
                throw new Exception(string.Format("The namespace: {0} is not valid clr namespace", xEntity_ns));

            string entity_ns = RemoveWhitespace(xEntity_ns.ToString()).Replace("clr-namespace:", "");
            string entityTypeName = typeParts2[1];
            string[] nsparts = entity_ns.Split(';');

            entityTypeName = string.Format("{0}.{1}", nsparts[0], entityTypeName);
            if (nsparts.Length == 2 && nsparts[1].IndexOf("assembly=") >= 0)
            {
                entityTypeName = string.Format("{0}, {1}", entityTypeName, nsparts[1].Replace("assembly=", ""));
            }
            Type entityType = Type.GetType(entityTypeName, true);
            return entityType;
        }

        private static string RemoveWhitespace(string input)
        {
            return new string(input.ToCharArray()
                .Where(c => !Char.IsWhiteSpace(c))
                .ToArray());
        }
        #endregion
    }
}

using RIAPP.DataService.Resources;
using RIAPP.DataService.Types;
using RIAPP.DataService.Utils.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace RIAPP.DataService.Utils
{
    public class DataHelper : IDataHelper
    {
        private IServiceContainer _serviceContainer;

        public DataHelper(IServiceContainer serviceContainer)
        {
            this._serviceContainer = serviceContainer;
        }

        private static IList CreateList<T>()
        {
            return new List<T>();
        }

        private static IEnumerable CreateArray<T>(List<T> list)
        {
            return list.ToArray();
        }

        public static int GetLocalDateTimezoneOffset(DateTime dt)
        {
            DateTime uval = dt.ToUniversalTime();
            TimeSpan tspn = uval - dt;
            return (int)tspn.TotalMinutes;
        }

        public object GetValue(object obj, string propertyName, bool throwErrors)
        {
            string[] parts = propertyName.Split('.');
            Type enityType = obj.GetType();
            PropertyInfo pinfo = enityType.GetProperty(parts[0]);
            if (pinfo == null && throwErrors)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, propertyName));
            if (pinfo == null)
                return null;
            if (parts.Length == 1)
            {
                return pinfo.GetValue(obj, null);
            }
            else
            {
                var pval = pinfo.GetValue(obj, null);
                if (pval == null)
                    throw new Exception(string.Format(ErrorStrings.ERR_PPROPERTY_ISNULL, enityType.Name, pinfo.Name));
                return this.GetValue(pval, string.Join(".", parts.Skip(1).ToArray()), throwErrors);
            }
        }

        public bool SetValue(object obj, string propertyName, object value, bool throwErrors)
        {
            string[] parts = propertyName.Split('.');
            Type enityType = obj.GetType();
            PropertyInfo pinfo = enityType.GetProperty(parts[0]);
            if (pinfo == null && throwErrors)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, propertyName));
            if (pinfo == null)
                return false;
            if (parts.Length == 1)
            {
                if (!pinfo.CanWrite)
                {
                    if (throwErrors)
                        throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_READONLY, enityType.Name, propertyName));
                    return false;
                }
                pinfo.SetValue(obj, value, null);
                return true;
            }
            else
            {
                var pval = pinfo.GetValue(obj, null);
                if (pval == null)
                    throw new Exception(string.Format(ErrorStrings.ERR_PPROPERTY_ISNULL, enityType.Name, pinfo.Name));
                return this.SetValue(pval, string.Join(".", parts.Skip(1).ToArray()), value, throwErrors);
            }
        }

        public object SetFieldValue(object entity, string fullName, Field fieldInfo, string value)
        {
            string[] parts = fullName.Split('.');
            Type enityType = entity.GetType();
            PropertyInfo pinfo = enityType.GetProperty(parts[0]);
            if (pinfo == null)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, fieldInfo.fieldName));
            if (parts.Length == 1)
            {
                if (!pinfo.CanWrite)
                {
                    throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_READONLY, enityType.Name, fieldInfo.fieldName));
                }

                Type propType = pinfo.PropertyType;
                bool IsNullableType = this._serviceContainer.ValueConverter.IsNullableType(propType);
                object val = this._serviceContainer.ValueConverter.DeserializeField(propType, fieldInfo, value);

                if (val != null)
                    pinfo.SetValue(entity, val, null);
                else if (IsNullableType && val == null)
                    pinfo.SetValue(entity, val, null);
                else if (!propType.IsValueType && val == null)
                    pinfo.SetValue(entity, val, null);
                else
                    throw new Exception(string.Format(ErrorStrings.ERR_FIELD_IS_NOT_NULLABLE, fieldInfo.fieldName));
                return val;
            }
            else
            {
                var pval = pinfo.GetValue(entity, null);
                if (pval == null)
                    throw new Exception(string.Format(ErrorStrings.ERR_PPROPERTY_ISNULL, enityType.Name, pinfo.Name));
                return this.SetFieldValue(pval, string.Join(".", parts.Skip(1).ToArray()), fieldInfo, value);
            }
        }

        private object[] SerializeObjectField(object fieldOwner, Field objectFieldInfo)
        {
            var fieldInfos = objectFieldInfo.GetNestedInResultFields();
            object[] res =new object[fieldInfos.Length];
            for (int i = 0; i < fieldInfos.Length; ++i)
            {
                res[i] = this.SerializeField(fieldOwner, fieldInfos[i]);
            }
            return res;
        }

        /// <summary>
        /// extracts field value from entity, and converts value to a serialized form
        /// </summary>
        protected virtual bool SerializeField(object fieldOwner, Field fieldInfo, bool optional, out object val)
        {
            val = null;
            Type enityType = fieldOwner.GetType();
            PropertyInfo pinfo = enityType.GetProperty(fieldInfo.fieldName);
            if (pinfo == null && !optional)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, fieldInfo.fieldName));

            if (pinfo == null)
            {
                return false;
            }
            if (fieldInfo.fieldType == FieldType.Object)
            {
                object propValue = pinfo.GetValue(fieldOwner, null);
                val = this.SerializeObjectField(propValue, fieldInfo);
            }
            else
            {
                object fieldValue = pinfo.GetValue(fieldOwner, null);
                val = this._serviceContainer.ValueConverter.SerializeField(pinfo.PropertyType, fieldInfo, fieldValue);
            }
            return true;
        }

        public object SerializeField(object fieldOwner, Field fieldInfo)
        {
            object val;
            bool isOK = this.SerializeField(fieldOwner, fieldInfo, false, out val);
            return val;
        }

        public string SerializeField(object fieldOwner, string fullName, Field fieldInfo)
        {
            string[] parts = fullName.Split('.');
            if (parts.Length == 1)
            {
                Type enityType = fieldOwner.GetType();
                PropertyInfo pinfo = enityType.GetProperty(fieldInfo.fieldName);
                if (pinfo == null)
                {
                    throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, fieldInfo.fieldName));
                }
                object fieldValue = pinfo.GetValue(fieldOwner, null);
                return this._serviceContainer.ValueConverter.SerializeField(pinfo.PropertyType, fieldInfo, fieldValue);
            }
            else
            {
                for (int i = 0; i < parts.Length-1; i += 1)
                {
                    Type enityType = fieldOwner.GetType();
                    PropertyInfo pinfo = enityType.GetProperty(parts[i]);
                    if (pinfo == null)
                        throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING, enityType.Name, parts[i]));
                    fieldOwner = pinfo.GetValue(fieldOwner, null);
                }
                return this.SerializeField(fieldOwner, parts[parts.Length - 1], fieldInfo);
            }
        }

        private object[] DeSerializeObjectField(Type propType, Field objectFieldInfo, object[] values)
        {
            var fieldInfos = objectFieldInfo.GetNestedInResultFields();
            object[] res = new object[fieldInfos.Length];
            for (int i = 0; i < fieldInfos.Length; ++i)
            {
                res[i] = this.DeserializeField(propType, fieldInfos[i], values[i]);
            }
            return res;
        }

        public object DeserializeField(Type entityType, Field fieldInfo, object value)
        {
            PropertyInfo propInfo = entityType.GetProperty(fieldInfo.fieldName);

            if (propInfo == null)
                throw new Exception(string.Format(ErrorStrings.ERR_PROPERTY_IS_MISSING,entityType.Name, fieldInfo.fieldName));

            if (fieldInfo.fieldType == FieldType.Object)
            {
                return this.DeSerializeObjectField(propInfo.PropertyType, fieldInfo, (object[])value);
            }
            else
            {
                return this._serviceContainer.ValueConverter.DeserializeField(propInfo.PropertyType, fieldInfo, (string)value);
            }
        }
    
        public object ParseParameter(Type paramType, ParamMetadata pinfo, bool isArray, string val)
        {
            DataType dataType = pinfo.dataType;

            if (isArray && val != null)
            {
                string[] arr = (string[])this._serviceContainer.Serializer.DeSerialize(val, typeof(string[]));
                if (arr == null)
                    return null;
                IList list = (IList)typeof(DataHelper).GetMethod("CreateList", BindingFlags.NonPublic | BindingFlags.Static)
                    .MakeGenericMethod(paramType.GetElementType())
                    .Invoke(null, new object[] { });
                foreach (var v in arr)
                {
                    list.Add(ParseParameter(paramType.GetElementType(), pinfo, false, v));
                }

                return typeof(DataHelper).GetMethod("CreateArray", BindingFlags.NonPublic | BindingFlags.Static)
                    .MakeGenericMethod(paramType.GetElementType())
                    .Invoke(null, new object[] { list });
            }
            else
                return this._serviceContainer.ValueConverter.DeserializeValue(paramType, dataType, pinfo.dateConversion, val);
        }

        public Field getFieldInfo(DbSetInfo dbSetInfo, string fullName)
        {
            Dictionary<string, Field> fieldsByName = dbSetInfo.GetFieldByNames();
            return fieldsByName[fullName];
        }

        public void ForEachFieldInfo(string path, Field rootField,  Action<string, Field> callBack)
        {
            if (rootField.fieldType == FieldType.Object)
            {
                callBack(path + rootField.fieldName, rootField);
                rootField.nested.ForEach((fieldInfo) =>
                {
                    this.ForEachFieldInfo(path + rootField.fieldName + ".", fieldInfo, callBack);
                });
            }
            else
            {
                callBack(path + rootField.fieldName, rootField);
            }
        }

        public static System.Reflection.MethodInfo GetMethodInfo(Type t, string name)
        {
            MethodInfo meth = null;
            if (!string.IsNullOrEmpty(name))
                meth = t.GetMethod(name, BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly);
            return meth;
        }
    }
}

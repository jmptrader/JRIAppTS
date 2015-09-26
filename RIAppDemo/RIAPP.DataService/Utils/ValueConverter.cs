using System;
using System.Text;
using RIAPP.DataService.Resources;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Utils
{
    public class ValueConverter : IValueConverter
    {
        private IServiceContainer _serviceContainer;

        public ValueConverter(IServiceContainer serviceContainer)
        {
            this._serviceContainer = serviceContainer;
        }

        protected object CreateGenericInstance(Type propType, Type propMainType, object[] constructorArgs)
        {
            Type typeToConstruct = propType.GetGenericTypeDefinition();
            Type[] argsType = new Type[] { propMainType };
            Type nullableType = typeToConstruct.MakeGenericType(argsType);
            object val = Activator.CreateInstance(nullableType, constructorArgs);
            return val;
        }

        protected DateTime ParseDateTimeValue(string val, DateConversion dateConversion)
        {
            string[] parts = val.Split('-');
            if (parts.Length != 7)
            {
                throw new ArgumentException(string.Format(ErrorStrings.ERR_VAL_DATEFORMAT_INVALID, val));
            }
            DateTime dt = new DateTime(int.Parse(parts[0]), int.Parse(parts[1]), int.Parse(parts[2]), int.Parse(parts[3]), int.Parse(parts[4]), int.Parse(parts[5]), String.IsNullOrEmpty(parts[6]) ? 0 : int.Parse(parts[6]), DateTimeKind.Unspecified);
            return dt;
        }

        protected string DateToValue(DateTime dt)
        {
            string v = string.Format("{0}-{1}-{2}-{3}-{4}-{5}-{6}", dt.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, dt.Second, dt.Millisecond);
            return v;
        }

        protected string DateOffsetToValue(DateTimeOffset dtoff)
        {
            return this.DateToValue(dtoff.DateTime);
        }

        protected virtual object ConvertToBool(string value, bool IsNullableType)
        {
            if (value == null)
                return null;
            if (IsNullableType)
                return new Nullable<bool>(bool.Parse(value));
            else
                return bool.Parse(value);
        }

        protected virtual object ConvertToDate(string value, bool IsNullableType, DateConversion dateConversion)
        {
            if (value == null)
                return null;
            DateTime dt = this.ParseDateTimeValue(value, dateConversion);
            if (IsNullableType)
                return new Nullable<DateTime>(dt);
            else
                return dt;
        }

        protected virtual object ConvertToGuid(string value, bool IsNullableType)
        {
            if (value == null)
                return null;
            if (IsNullableType)
                return new Nullable<Guid>(new Guid(value));
            else
                return new Guid(value);
        }

        protected virtual object ConvertToNumber(string value, bool IsNullableType, Type propType, Type propMainType)
        {
            if (value == null)
                return null;

            object typedVal = Convert.ChangeType(value, propMainType, System.Globalization.CultureInfo.InvariantCulture);
            if (IsNullableType)
            {
                return this.CreateGenericInstance(propType, propMainType, new object[] { typedVal });
            }
            else
                return typedVal;
        }

        protected virtual object ConvertToBinary(string value, Type propType)
        {
            if (value == null)
                return null;
            if (propType != typeof(byte[]))
                throw new Exception(string.Format(ErrorStrings.ERR_VAL_DATATYPE_INVALID, propType.FullName));
            StringBuilder sb = new StringBuilder(value);
            sb.Remove(sb.Length - 1, 1); //remove ]
            sb.Remove(0, 1); //remove [
            int cnt = sb.Length, bytesCnt = cnt>0?1:0;

            for (int i = 0; i < cnt; ++i)
            {
                if (sb[i] == ',')
                {
                    bytesCnt += 1;
                }
            }

            byte[] bytes = new byte[bytesCnt];
            bytesCnt = 0; //calculate again
            string val ="";
            for(int i=0;i<cnt; ++i){
                if (sb[i] == ','){
                    bytes[bytesCnt] = Byte.Parse(val);
                    bytesCnt += 1;
                    val="";
                }
                else{
                    if (sb[i] != '"' && sb[i] != ' ')
                        val+=sb[i];
                }
            }
            if (val != "")
            {
                bytes[bytesCnt] = Byte.Parse(val);
                bytesCnt += 1;
                val = "";
            }

            byte[] bytes2;
            if (bytesCnt < bytes.Length)
            {
                bytes2 = new byte[bytesCnt];
                Buffer.BlockCopy(bytes, 0, bytes2, 0, bytesCnt);
            }
            else
                bytes2 = bytes;

            return bytes2;
        }

        protected virtual object ConvertToString(string value, Type propType)
        {
            if (value == null)
                return null;
            if (propType != typeof(string))
                throw new Exception(string.Format(ErrorStrings.ERR_VAL_DATATYPE_INVALID, propType.FullName));
            return value;
        }

        protected virtual object ConvertTo(string value, bool IsNullableType, Type propType, Type propMainType)
        {
            if (value == null)
                return null;
            object typedVal = null;

            if (!propMainType.IsValueType)
            {
                typedVal = this._serviceContainer.Serializer.DeSerialize(value, propMainType);
            }
            else
            {
                try
                {
                    typedVal = Convert.ChangeType(value, propMainType, System.Globalization.CultureInfo.InvariantCulture);
                }
                catch (System.InvalidCastException)
                {
                    typedVal = this._serviceContainer.Serializer.DeSerialize(value, propMainType);
                }
            }

            if (IsNullableType)
            {
                return this.CreateGenericInstance(propType, propMainType, new object[] { typedVal });
            }
            else
                return typedVal;
        }

        protected virtual string GuidToString(object value)
        {
            return value.ToString();
        }

        protected virtual string DateOffsetToString(object value, bool IsNullable)
        {
            if (IsNullable)
                return this.DateOffsetToValue(((Nullable<DateTimeOffset>)value).Value);
            else
                return this.DateOffsetToValue((DateTimeOffset)value);
        }

        protected virtual string DateToString(object value, bool IsNullable)
        {
            if (IsNullable)
                return this.DateToValue(((Nullable<DateTime>)value).Value);
            else
                return this.DateToValue((DateTime)value);
        }

        protected virtual string BoolToString(object value)
        {
            return value.ToString().ToLowerInvariant();
        }

        protected virtual string BytesToString(object value)
        {
            byte[] bytes = (byte[])value;
            StringBuilder sb = new StringBuilder(bytes.Length * 4);
            sb.Append("[");
            for (int i = 0; i < bytes.Length; ++i)
            {
                if (i > 0)
                    sb.Append(",");
                sb.Append(bytes[i]);
            }
            sb.Append("]");
            return sb.ToString();
        }

        public virtual object DeserializeField(Type propType, Field fieldInfo, string value)
        {
            return this.DeserializeValue(propType, fieldInfo.dataType, fieldInfo.dateConversion, value);
        }

        public virtual object DeserializeValue(Type propType, DataType dataType, DateConversion dateConversion, string value)
        {
            object result = null;
            bool IsNullable = ValueConverter.IsNullableTypeCore(propType);
            Type propMainType = null;
            if (!IsNullable)
                propMainType = propType;
            else
                propMainType = Nullable.GetUnderlyingType(propType);

            switch (dataType)
            {
                case DataType.Bool:
                    result = this.ConvertToBool(value, IsNullable);
                    break;
                case DataType.DateTime:
                case DataType.Date:
                case DataType.Time:
                    result = this.ConvertToDate(value, IsNullable, dateConversion);
                    if (result != null && propMainType == typeof(DateTimeOffset))
                    {
                        result = new DateTimeOffset((DateTime)result);
                    }
                    break;
                case DataType.Guid:
                    result = this.ConvertToGuid(value, IsNullable);
                    break;
                case DataType.Integer:
                case DataType.Decimal:
                case DataType.Float:
                    result = this.ConvertToNumber(value, IsNullable, propType, propMainType);
                    break;
                case DataType.Binary:
                    result = this.ConvertToBinary(value, propType);
                    break;
                case DataType.String:
                    result = this.ConvertToString(value, propType);
                    break;
                case DataType.None:
                    if (propType == typeof(string))
                        result = value;
                    else
                        result = this.ConvertTo(value, IsNullable, propType, propMainType);
                    break;
                default:
                    throw new Exception(string.Format(ErrorStrings.ERR_VAL_DATATYPE_INVALID, dataType));
            }

            return result;
        }

        public virtual string SerializeField(Type propType, Field fieldInfo, object value)
        {
            if (value == null)
                return null;
            bool isNullable = ValueConverter.IsNullableTypeCore(propType);
            Type realType = null;
            if (!isNullable)
                realType = propType;
            else
                realType = Nullable.GetUnderlyingType(propType);

            if (isNullable)
            {
                string str = value.ToString();
                if (str == String.Empty)
                    return null;
            }

            if (realType == typeof(Guid))
            {
                return this.GuidToString(value);
            }
            else if (realType == typeof(DateTime))
            {
                return this.DateToString(value, isNullable);
            }
            else if (realType == typeof(DateTimeOffset))
            {
                return this.DateOffsetToString(value, isNullable);
            }
            else if (realType == typeof(Boolean))
            {
                return this.BoolToString(value);
            }
            else if (value is byte[])
            {
                return this.BytesToString(value);
            }
            else
            {
                if (realType.IsValueType)
                {
                    return (string)Convert.ChangeType(value, typeof(string), System.Globalization.CultureInfo.InvariantCulture);
                }
                else
                {
                    return value.ToString();
                }
            }
        }
   
        public virtual DataType DataTypeFromType(Type type, out bool isArray)
        {
            return ValueConverter.DataTypeFromTypeCore(type, out isArray);
        }

        public bool IsNullableType(Type propType)
        {
            return IsNullableTypeCore(propType);
        }
        
        public static bool IsNullableTypeCore(Type propType)
        {
            return propType.IsGenericType && propType.GetGenericTypeDefinition() == typeof(Nullable<int>).GetGenericTypeDefinition();
        }

        public static DataType DataTypeFromTypeCore(Type type, out bool isArray)
        {
            bool isNullable = ValueConverter.IsNullableTypeCore(type);
            isArray = false;
            Type realType = null;
            if (!isNullable)
                realType = type;
            else
                realType = Nullable.GetUnderlyingType(type);
            string fullName = realType.FullName, name = fullName;
            if (fullName.EndsWith("[]"))
            {
                isArray = true;
                name = fullName.Substring(0, fullName.Length - 2);
            }

            switch (name)
            {
                case "System.Byte":
                    if (isArray)
                    {
                        //Binary is data type separate from the array (although it is array by its nature)
                        isArray = false; 
                        return DataType.Binary;
                    }
                    else
                        return DataType.Integer;
                case "System.String":
                    return DataType.String;
                case "System.Int16":
                case "System.Int32":
                case "System.Int64":
                case "System.UInt16":
                case "System.UInt32":
                case "System.UInt64":
                    return DataType.Integer;
                case "System.Decimal":
                    return DataType.Decimal;
                case "System.Double":
                case "System.Single":
                    return DataType.Float;
                case "System.DateTime":
                case "System.DateTimeOffset":
                    return DataType.DateTime;
                case "System.Boolean":
                    return DataType.Bool;
                case "System.Guid":
                    return DataType.Guid;
                default:
                    throw new UnsupportedTypeException(string.Format("Unsupported method type {0}", realType.FullName));
            }
        }

    }
}

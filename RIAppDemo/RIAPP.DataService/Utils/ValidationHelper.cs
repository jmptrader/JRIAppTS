using System;
using RIAPP.DataService.Resources;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Utils
{
    public class ValidationHelper : IValidationHelper
    {
        private IServiceContainer _serviceContainer;

        public ValidationHelper(IServiceContainer serviceContainer)
        {
            this._serviceContainer = serviceContainer;
        }

        public void CheckString(Field fieldInfo, string val)
        {
            if (val == null)
                return;

            if (fieldInfo.maxLength > 0)
            {
                if (!string.IsNullOrEmpty(val))
                {
                    if (val.Length > fieldInfo.maxLength)
                    {
                        throw new ValidationException(string.Format(ErrorStrings.ERR_VAL_EXCEEDS_MAXLENGTH, fieldInfo.fieldName, fieldInfo.maxLength));
                    }
                }
            }

            if (!string.IsNullOrEmpty(val) && !string.IsNullOrEmpty(fieldInfo.regex))
            {
                var rx = new System.Text.RegularExpressions.Regex(fieldInfo.regex, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                if (!rx.IsMatch(val))
                {
                    throw new ValidationException(string.Format(ErrorStrings.ERR_VAL_IS_NOT_VALID, fieldInfo.fieldName));
                }
            }
        }

        public void CheckRange(Field fieldInfo, string val)
        {
            if (val == null)
                return;
            if (!string.IsNullOrEmpty(fieldInfo.range)) {
                string[] rangeParts = fieldInfo.range.Split(',');
                switch (fieldInfo.dataType)
                {
                    case DataType.Integer:
                    case DataType.Decimal:
                    case DataType.Float: 
                        {
                            double dblval = Double.Parse(val, System.Globalization.CultureInfo.InvariantCulture);
                            if (!string.IsNullOrEmpty(rangeParts[0]))
                            {
                                double minDbl = Double.Parse(rangeParts[0], System.Globalization.CultureInfo.InvariantCulture);
                                if (dblval < minDbl)
                                    throw new ValidationException(string.Format(ErrorStrings.ERR_VAL_RANGE_NOT_VALID, fieldInfo.fieldName, fieldInfo.range));
                            }
                            if (!string.IsNullOrEmpty(rangeParts[1]))
                            {
                                double maxDbl = Double.Parse(rangeParts[1], System.Globalization.CultureInfo.InvariantCulture);
                                if (dblval > maxDbl)
                                    throw new ValidationException(string.Format(ErrorStrings.ERR_VAL_RANGE_NOT_VALID, fieldInfo.fieldName, fieldInfo.range));
                            }
                        }
                        break;
                    case DataType.Date:
                    case DataType.DateTime:
                        {
                            DateTime dtval = (DateTime)this._serviceContainer.ValueConverter.DeserializeValue(typeof(DateTime), DataType.DateTime, fieldInfo.dateConversion, val);
                            if (!string.IsNullOrEmpty(rangeParts[0]))
                            {
                                DateTime minDt = DateTime.ParseExact(rangeParts[0], "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
                                if (dtval < minDt)
                                    throw new ValidationException(string.Format(ErrorStrings.ERR_VAL_RANGE_NOT_VALID, fieldInfo.fieldName, fieldInfo.range));
                            }
                            if (!string.IsNullOrEmpty(rangeParts[1]))
                            {
                                DateTime maxDt = DateTime.ParseExact(rangeParts[1], "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
                                if (dtval > maxDt)
                                    throw new ValidationException(string.Format(ErrorStrings.ERR_VAL_RANGE_NOT_VALID, fieldInfo.fieldName, fieldInfo.range));
                            }
                        }
                        break;
                    default:
                        return;
                }
                
            }
        }

        public void CheckValue(Field fieldInfo, string val)
        {
            if (val == null && !fieldInfo.isNullable)
            {
                throw new ValidationException(string.Format(ErrorStrings.ERR_FIELD_IS_NOT_NULLABLE, fieldInfo.fieldName));
            }
            if (fieldInfo.dataType == DataType.String)
            {
                this.CheckString(fieldInfo, val);
            }
            this.CheckRange(fieldInfo, val);
        }
    }
}

namespace RIAPP.MOD.converter {
    export var NUM_CONV = { None: 0, Integer: 1, Decimal: 2, Float: 3, SmallInt: 4 };

    export class BaseConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): any {
            return val;
        }
        convertToTarget(val: any, param: any, dataContext: any): any {
            if (RIAPP.global.utils.check.isNt(val))
                return null;
            return val;
        }
    };
    var baseConverter = new BaseConverter();

    export class DateConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): Date {
            if (!val)
                return null;
            var defaults = RIAPP.global.defaults, datepicker = defaults.datepicker;
            if (!!datepicker)
                return datepicker.parseDate(val);
            else
                return dateTimeConverter.convertToSource(val, defaults.dateFormat, dataContext);
        }
        convertToTarget(val: any, param: any, dataContext: any): string {
            if (RIAPP.global.utils.check.isNt(val))
                return '';
            var defaults = RIAPP.global.defaults, datepicker = defaults.datepicker;
            if (!!datepicker)
                return datepicker.formatDate(val);
            else
                return dateTimeConverter.convertToTarget(val, defaults.dateFormat, dataContext);
        }
        toString() {
            return 'DateConverter';
        }
    };
    var dateConverter = new DateConverter();

    export class DateTimeConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): Date {
            if (!val)
                return null;
            var m = moment(val, param);
            if (!m.isValid()) {
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_CONV_INVALID_DATE, val));
            }
            return m.toDate();
        }
        convertToTarget(val: any, param: any, dataContext: any): string {
            if (RIAPP.global.utils.check.isNt(val)) {
                return '';
            }
            var m = moment(val);
            return m.format(param);
        }
        toString() {
            return 'DateTimeConverter';
        }
    };
    var dateTimeConverter = new DateTimeConverter();

    export class NumberConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number {
            var utils = RIAPP.global.utils;
            if (RIAPP.global.utils.check.isNt(val))
                return null;
            var defaults = global.defaults, dp = defaults.decimalPoint, thousand_sep = defaults.thousandSep, prec = 4;
            var value = val.replace(thousand_sep, '');
            value = value.replace(dp, '.');
            value = RIAPP.global.utils.str.stripNonNumeric(value);
            if (value === '') {
                return null;
            }
            var num: number = null;
            switch (param) {
                case NUM_CONV.SmallInt:
                    num = parseInt(value, 10);
                    break;
                case NUM_CONV.Integer:
                    num = parseInt(value, 10);
                    break;
                case NUM_CONV.Decimal:
                    prec = defaults.decPrecision;
                    num = utils.round(parseFloat(value), prec);
                    break;
                case NUM_CONV.Float:
                    num = parseFloat(value);
                    break;
                default:
                    num = Number(value);
            }

            if (!utils.check.isNumber(num)) {
                throw new Error(utils.format(RIAPP.ERRS.ERR_CONV_INVALID_NUM, val));
            }
            return num;
        }
        convertToTarget(val: any, param: any, dataContext: any): string {
            var utils = RIAPP.global.utils;
            if (utils.check.isNt(val)) {
                return '';
            }
            var defaults = global.defaults, dp = defaults.decimalPoint, thousand_sep = defaults.thousandSep, prec: number;
            switch (param) {
                case NUM_CONV.Integer:
                    prec = 0;
                    return utils.str.formatNumber(val, prec, dp, thousand_sep);
                case NUM_CONV.Decimal:
                    prec = defaults.decPrecision;
                    return utils.str.formatNumber(val, prec, dp, thousand_sep);
                case NUM_CONV.SmallInt:
                    prec = 0;
                    return utils.str.formatNumber(val, prec, dp, '');
                case NUM_CONV.Float:
                    //float number type preserves all number precision
                    return utils.str.formatNumber(val, null, dp, thousand_sep);
                    break;
                default:
                    return utils.str.formatNumber(val, null, dp, thousand_sep);
            }
        }
        toString() {
            return 'NumberConverter';
        }
    };
    var numberConverter = new NumberConverter();

    export class IntegerConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number {
            return numberConverter.convertToSource(val, NUM_CONV.Integer, dataContext);
        }
        convertToTarget(val: any, param: any, dataContext: any): string {
            return numberConverter.convertToTarget(val, NUM_CONV.Integer, dataContext);
        }
        toString() {
            return 'IntegerConverter';
        }
    };
    var integerConverter = new IntegerConverter();

    export class SmallIntConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number {
            return numberConverter.convertToSource(val, NUM_CONV.SmallInt, dataContext);
        }
        convertToTarget(val: any, param: any, dataContext: any): string {
            return numberConverter.convertToTarget(val, NUM_CONV.SmallInt, dataContext);
        }
        toString() {
            return 'SmallIntConverter';
        }
    };
    var smallIntConverter = new SmallIntConverter();

    export class DecimalConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number {
            return numberConverter.convertToSource(val, NUM_CONV.Decimal, dataContext);
        }
        convertToTarget(val: any, param: any, dataContext: any): string {
            return numberConverter.convertToTarget(val, NUM_CONV.Decimal, dataContext);
        }
        toString() {
            return 'DecimalConverter';
        }
    };
    var decimalConverter = new DecimalConverter();

    export class FloatConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number {
            return numberConverter.convertToSource(val, NUM_CONV.Float, dataContext);
        }
        convertToTarget(val: any, param: any, dataContext: any): string {
            return numberConverter.convertToTarget(val, NUM_CONV.Float, dataContext);
        }
        toString() {
            return 'FloatConverter';
        }
    };
    var floatConverter = new FloatConverter();

    export class NotConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): boolean {
            return !val;
        }
        convertToTarget(val: any, param: any, dataContext: any): boolean {
            return !val;
        }
    }

    global.registerConverter('BaseConverter', baseConverter);
    global.registerConverter('dateConverter', dateConverter);
    global.registerConverter('dateTimeConverter', dateTimeConverter);
    global.registerConverter('numberConverter', numberConverter);
    global.registerConverter('integerConverter', integerConverter);
    global.registerConverter('smallIntConverter', smallIntConverter);
    global.registerConverter('decimalConverter', decimalConverter);
    global.registerConverter('floatConverter', floatConverter);
    global.registerConverter('notConverter', new NotConverter());
    _isModuleLoaded = true;
}

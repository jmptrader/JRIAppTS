namespace RIAPP.consts {
    export var DATA_ATTR = {
        EL_VIEW_KEY: 'data-elvwkey',
        DATA_BIND: 'data-bind',
        DATA_VIEW: 'data-view',
        DATA_EVENT_SCOPE: 'data-scope',
        DATA_ITEM_KEY: 'data-key',
        DATA_CONTENT: 'data-content',
        DATA_COLUMN: 'data-column',
        DATA_NAME: 'data-name',
        DATA_FORM: 'data-form'
    };
    export const enum DATE_CONVERSION { None = 0, ServerLocalToClientLocal = 1, UtcToClientLocal = 2 }
    export const enum DATA_TYPE {
        None = 0, String = 1, Bool = 2, Integer = 3, Decimal = 4, Float = 5, DateTime = 6, Date = 7, Time = 8,
        Guid = 9, Binary = 10
    }
    export const enum FIELD_TYPE { None = 0, ClientOnly = 1, Calculated = 2, Navigation = 3, RowTimeStamp = 4, Object = 5, ServerCalculated = 6 }

    export const enum KEYS {
        backspace = 8,
        tab = 9,
        enter = 13,
        esc = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        del = 127
    }
    export var ELVIEW_NM = { DATAFORM: 'dataform' };
    export var LOADER_GIF = { SMALL: 'loader2.gif', NORMAL: 'loader.gif' };
}

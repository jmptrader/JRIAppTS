namespace RIAPP.MOD.parser {
    import utilsMOD = RIAPP.MOD.utils;
    import collMOD = RIAPP.MOD.collection;

    var utils: utilsMOD.Utils;
    RIAPP.global.addOnInitialize((s, args) => {
        utils = s.utils;
    });

    export class Parser {
        static __trimOuterBracesRX = /^([{]){0,1}|([}]){0,1}$/g;
        static __trimQuotsRX = /^(['"])+|(['"])+$/g;
        static __trimBracketsRX = /^(\[)+|(\])+$/g;
        static __indexedPropRX = /(^\w+)\s*\[\s*['"]?\s*([^'"]+)\s*['",]?\s*\]/i; //regex expression to extract parts from obj[index] strings
        static __valueDelimeter1 = ':';
        static __valueDelimeter2 = '=';
        static __keyValDelimeter = ',';
        constructor() {
        }
        //extract key - value pairs
        protected _getKeyVals(val: string) {
            var i: number, ch: string, literal: string, parts: { key: string; val: any; }[] = [],
                kv: { key: string; val: any; } = { key: '', val: '' }, isKey = true, bracePart: string,
                vd1 = Parser.__valueDelimeter1, vd2 = Parser.__valueDelimeter2, kvd = Parser.__keyValDelimeter;

            var addNewKeyValPair = function (kv: { key: string; val: any; }) {
                if (kv.val) {
                    if (utils.check.isNumeric(kv.val)) {
                        kv.val = Number(kv.val);
                    }
                    else if (utils.check.isBoolString(kv.val)) {
                        kv.val = utils.parseBool(kv.val);
                    }
                }
                parts.push(kv);
            };

            var checkTokens = function (kv: { key: string; val: any; }) {
                //key starts with this like used in binding expressions this.property
                if (kv.val === '' && utils.str.startsWith(kv.key, 'this.')) {
                    kv.val = kv.key.substr(5); //extract property
                    kv.key = 'targetPath';
                }
            };

            for (i = 0; i < val.length; i += 1) {
                ch = val.charAt(i);
                //is this content inside '' or "" ?
                if (ch == "'" || ch == '"') {
                    if (!literal)
                        literal = ch;
                    else if (literal == ch)
                        literal = null;
                }

                //value inside braces
                if (!literal && ch === "{" && !isKey) {
                    bracePart = val.substr(i);
                    bracePart = this.getBraceParts(bracePart, true)[0];
                    kv.val += bracePart;
                    i += bracePart.length - 1;
                    continue;
                }

                if (!literal && ch === kvd) {
                    if (!!kv.key) {
                        addNewKeyValPair(kv);
                        kv = { key: '', val: '' };
                        isKey = true; //currently parsing key value
                    }
                }
                else if (!literal && (ch === vd1 || ch === vd2)) {
                    isKey = false; //begin parsing value
                }
                else {
                    if (isKey)
                        kv.key += ch;
                    else
                        kv.val += ch;
                }
            }

            if (!!kv.key) {
                addNewKeyValPair(kv);
            }

            parts.forEach(function (kv) {
                kv.key = utils.str.trim(kv.key);
                if (utils.check.isString(kv.val))
                    kv.val = utils.str.trim(kv.val);
                checkTokens(kv);
            });

            parts = parts.filter(function (kv) {
                return kv.val !== ''; //when key has value
            });
            return parts;
        }
        getPathParts(path: string) {
            var self = this, parts: string[] = (!path) ? [] : path.split('.'), parts2: string[] = [];
            parts.forEach(function (part) {
                var matches: string[], obj: string, index: string;
                matches = part.match(Parser.__indexedPropRX);
                if (!!matches) {
                    obj = matches[1];
                    index = matches[2];
                    parts2.push(obj);
                    parts2.push('[' + index + ']');
                }
                else
                    parts2.push(part);
            });

            return parts2;
        }
        resolveProp(obj: any, prop: string) {
            if (!prop)
                return obj;
            if (utils.str.startsWith(prop, '[')) { 
                //it is an indexed property, obj must be of collection type
                prop = this.trimQuotes(this.trimBrackets(prop));
                if (collMOD._isCollection(obj)) {
                    return collMOD._getItemByProp(obj, prop);
                }
                else if (utils.check.isArray(obj)) {
                    return obj[parseInt(prop, 10)];
                }
                else
                    return obj[prop];
            }
            else
                return obj[prop];
        }
        setPropertyValue(obj: any, prop: string, val: any) {
            if (utils.str.startsWith(prop, '[')) { //it is an indexed property, obj must be of collection type
                prop = this.trimQuotes(this.trimBrackets(prop));  //remove brakets from a string like: [index]
                if (utils.check.isArray(obj)) {
                    obj[parseInt(prop, 10)] = val;
                }
                else
                    obj[prop] = val;
            }
            else
                obj[prop] = val;
        }
        resolveBindingSource(root: any, srcParts: string[]): any {
            if (!root)
                return undefined;

            if (srcParts.length === 0) {
                return root;
            }

            if (srcParts.length > 0) {
                return this.resolveBindingSource(this.resolveProp(root, srcParts[0]), srcParts.slice(1));
            }

            throw new Error('Invalid operation');
        }
        resolvePath(obj: any, path: string): any {
            if (!path)
                return obj;
            var parts = this.getPathParts(path), res = obj, len = parts.length - 1;
            for (var i = 0; i < len; i += 1) {
                res = this.resolveProp(res, parts[i]);
                if (!res)
                    return undefined;
            }
            return this.resolveProp(res, parts[len]);
        }
        //extract top level braces
        getBraceParts(val: string, firstOnly: boolean) {
            var i: number, s = '', ch: string, literal: string, cnt = 0, parts: string[] = [];

            for (i = 0; i < val.length; i += 1) {
                ch = val.charAt(i);
                //is this content inside '' or "" ?
                if (ch === "'" || ch === '"') {
                    if (!literal)
                        literal = ch;
                    else if (literal === ch)
                        literal = null;
                }

                if (!literal && ch === '{') {
                    cnt += 1;
                    s += ch;
                }
                else if (!literal && ch === '}') {
                    cnt -= 1;
                    s += ch;
                    if (cnt === 0) {
                        parts.push(s);
                        s = '';
                        if (firstOnly)
                            return parts;
                    }
                }
                else {
                    if (cnt > 0) {
                        s += ch;
                    }
                }
            }

            return parts;
        }
        trimOuterBraces(val: string) {
            return utils.str.trim(val.replace(Parser.__trimOuterBracesRX, ''));
        }
        trimQuotes(val: string) {
            return utils.str.trim(val.replace(Parser.__trimQuotsRX, ''));
        }
        trimBrackets(val: string) {
            return utils.str.trim(val.replace(Parser.__trimBracketsRX, ''));
        }
        isWithOuterBraces(str: string) {
            return (utils.str.startsWith(str, '{') && utils.str.endsWith(str, '}'));
        }
        parseOption(part: string) {
            var res: any = {}, self = this;
            part = utils.str.trim(part);
            if (self.isWithOuterBraces(part))
                part = self.trimOuterBraces(part);
            var kvals = self._getKeyVals(part);
            kvals.forEach(function (kv) {
                var isString = utils.check.isString(kv.val);
                if (isString && self.isWithOuterBraces(kv.val))
                    res[kv.key] = self.parseOption(kv.val);
                else {
                    if (isString)
                        res[kv.key] = self.trimQuotes(kv.val);
                    else
                        res[kv.key] = kv.val;
                }
            });

            return res;
        }
        parseOptions(str: string) {
            var res: any[] = [], self = this;

            str = utils.str.trim(str);
            var parts = [str];
            if (self.isWithOuterBraces(str)) {
                parts = self.getBraceParts(str, false);
            }
            parts.forEach(function (part) {
                res.push(self.parseOption(part));
            });

            return res;
        }
        toString() {
            return 'Parser';
        }
    }

    _isModuleLoaded = true;
}

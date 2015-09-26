﻿/// <reference path="..\..\jriappTS\jriapp.d.ts"/>

namespace RIAPP.FOLDERBROWSER_SVC {
    'use strict';
    /*
        Generated from: /FolderBrowserService/code?lang=ts on 2015-09-24 at 11:37
        Don't make manual changes here, because they will be lost when this db interface will be regenerated!
    */

    import collMOD = RIAPP.MOD.collection;
    import dbMOD = RIAPP.MOD.db;

    export interface ISvcMethods {
    }

    export class FileSystemObject extends collMOD.CollectionItem<dbMOD.EntityAspect<FileSystemObject, DbContext>> implements dbMOD.IEntityItem {

        constructor(aspect: dbMOD.EntityAspect<FileSystemObject, DbContext>) {
            super(aspect);

        }
        toString() {
            return 'FileSystemObject';
        }
        get Key(): string { return this._aspect._getFieldVal('Key'); }
        get ParentKey(): string { return this._aspect._getFieldVal('ParentKey'); }
        get Name(): string { return this._aspect._getFieldVal('Name'); }
        get Level(): number { return this._aspect._getFieldVal('Level'); }
        get HasSubDirs(): boolean { return this._aspect._getFieldVal('HasSubDirs'); }
        get IsFolder(): boolean { return this._aspect._getFieldVal('IsFolder'); }
        get fullPath(): string { return this._aspect._getCalcFieldVal('fullPath'); }
        get Parent(): FileSystemObject { return this._aspect._getNavFieldVal('Parent'); }
        set Parent(v: FileSystemObject) { this._aspect._setNavFieldVal('Parent', v); }
        get Children(): FileSystemObject[] { return this._aspect._getNavFieldVal('Children'); }

    }

    export class FileSystemObjectDb extends dbMOD.DbSet<FileSystemObject, DbContext>
    {
        constructor(dbContext: DbContext) {
            var self = this, opts: dbMOD.IDbSetConstuctorOptions = {
                dbContext: dbContext,
                dbSetInfo: { "fieldInfos": null, "enablePaging": false, "pageSize": 25, "dbSetName": "FileSystemObject" },
                childAssoc: ([{ "name": "ChildToParent", "parentDbSetName": "FileSystemObject", "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "parentToChildrenName": "Children", "onDeleteAction": 1, "fieldRels": [{ "parentField": "Key", "childField": "ParentKey" }] }]),
                parentAssoc: ([{ "name": "ChildToParent", "parentDbSetName": "FileSystemObject", "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "parentToChildrenName": "Children", "onDeleteAction": 1, "fieldRels": [{ "parentField": "Key", "childField": "ParentKey" }] }])
            }, utils = RIAPP.global.utils;
            opts.dbSetInfo.fieldInfos = ([{ "fieldName": "Key", "isPrimaryKey": 1, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": true, "isNeedOriginal": true, "maxLength": 255, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "ParentKey", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 255, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Name", "isPrimaryKey": 0, "dataType": 1, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": 255, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "Level", "isPrimaryKey": 0, "dataType": 3, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "HasSubDirs", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "IsFolder", "isPrimaryKey": 0, "dataType": 2, "isNullable": false, "isReadOnly": true, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 0, "dependentOn": "", "nested": null }, { "fieldName": "fullPath", "isPrimaryKey": 0, "dataType": 1, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 2, "dependentOn": "", "nested": null }, { "fieldName": "Parent", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "ParentKey", "nested": null }, { "fieldName": "Children", "isPrimaryKey": 0, "dataType": 0, "isNullable": true, "isReadOnly": false, "isAutoGenerated": false, "isNeedOriginal": true, "maxLength": -1, "dateConversion": 0, "allowClientDefault": false, "range": "", "regex": "", "fieldType": 3, "dependentOn": "", "nested": null }]);
            super(opts, FileSystemObject);
        }
        findEntity(key: string): FileSystemObject {
            return this.findByPK(RIAPP.ArrayHelper.fromList(arguments));
        }
        toString() {
            return 'FileSystemObjectDb';
        }
        createReadRootQuery(args?: {
            includeFiles: boolean;
            infoType: string;
        }) {
            var query = this.createQuery('ReadRoot');
            query.params = args;
            return query;
        }
        createReadChildrenQuery(args?: {
            parentKey: string;
            level: number;
            path: string;
            includeFiles: boolean;
            infoType: string;
        }) {
            var query = this.createQuery('ReadChildren');
            query.params = args;
            return query;
        }

        definefullPathField(getFunc: (item: FileSystemObject) => string) { this._defineCalculatedField('fullPath', getFunc); }

    }

    export interface IAssocs {
        getChildToParent: () => dbMOD.Association;
    }


    export class DbSets extends dbMOD.DbSets {
        constructor(dbContext: DbContext) {
            super(dbContext);
            this._dbSetNames = ["FileSystemObject"];
            this._createDbSet("FileSystemObject", FileSystemObjectDb);

        }
        get FileSystemObject() { return <FileSystemObjectDb>this.getDbSet("FileSystemObject"); }

    }

    export class DbContext extends dbMOD.DbContext {
        protected _initDbSets() {
            super._initDbSets();
            this._dbSets = new DbSets(this);
            var associations = [{ "name": "ChildToParent", "parentDbSetName": "FileSystemObject", "childDbSetName": "FileSystemObject", "childToParentName": "Parent", "parentToChildrenName": "Children", "onDeleteAction": 1, "fieldRels": [{ "parentField": "Key", "childField": "ParentKey" }] }];
            this._initAssociations(associations);
            var methods = [{ "methodName": "ReadRoot", "parameters": [{ "name": "includeFiles", "dataType": 2, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "infoType", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }], "methodResult": true, "isQuery": true }, { "methodName": "ReadChildren", "parameters": [{ "name": "parentKey", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 0 }, { "name": "level", "dataType": 3, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 1 }, { "name": "path", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 2 }, { "name": "includeFiles", "dataType": 2, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 3 }, { "name": "infoType", "dataType": 1, "isArray": false, "isNullable": false, "dateConversion": 0, "ordinal": 4 }], "methodResult": true, "isQuery": true }];
            this._initMethods(methods);
        }
        get associations() { return <IAssocs>this._assoc; }
        get dbSets() { return <DbSets>this._dbSets; }
        get serviceMethods() { return <ISvcMethods>this._svcMethods; }
    }
}

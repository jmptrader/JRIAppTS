using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;


namespace RIAPP.DataService.Types
{
    [DataContract]
    public class DbSetInfo
    {
        private Lazy<Field[]> _inResultFields;
        private Lazy<Field[]> _pkFields;
        private Lazy<Field> _timestampField;

        internal FieldsList _fieldInfos = new FieldsList();
        internal Dictionary<string, Field> _fieldsByNames;
        internal MethodInfo _validateDataMethod;
        internal MethodInfo _deleteDataMethod;
        internal MethodInfo _insertDataMethod;
        internal MethodInfo _updateDataMethod;
        internal MethodInfo _refreshDataMethod;

        public DbSetInfo()
        {
            this._inResultFields = new Lazy<Field[]>(() => this._fieldInfos.Where(f => f.GetIsIncludeInResult()).OrderBy(f => f._ordinal).ToArray(), false);
            this._pkFields = new Lazy<Field[]>(() => this.fieldInfos.Where(fi => fi.isPrimaryKey > 0).OrderBy(fi => fi.isPrimaryKey).ToArray(), false);
            this._timestampField = new Lazy<Field>(() => this.fieldInfos.Where(fi => fi.fieldType == FieldType.RowTimeStamp).FirstOrDefault(), false);

            this.enablePaging = true;
            this.pageSize = 25;
            this.isTrackChanges = false;
            this.FetchSize = 1000;
        }
        
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        [DataMember]
        public FieldsList fieldInfos
        {
            get
            {
                return _fieldInfos;
            }
        }

        [DataMember]
        public bool enablePaging
        {
            get;
            set;
        }

        [DataMember]
        public int pageSize
        {
            get;
            set;
        }

        [DataMember]
        public string dbSetName
        {
            get;
            set;
        }

        #region NonSerializable properties
        public Field[] GetInResultFields()
        {
            return this._inResultFields.Value;
        }

        public Field[] GetPKFields()
        {
            return this._pkFields.Value;
        }

        public Field GetTimeStampField()
        {
            return this._timestampField.Value;
        }

        [DefaultValue(1000)]
        [ScriptIgnore]
        [IgnoreDataMember]
        public int FetchSize
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public Type EntityType
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public string deleteDataMethod
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public string insertDataMethod
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        public string updateDataMethod
        {
            get;
            set;
        }

        [ScriptIgnore]
        [IgnoreDataMember]
        [DefaultValue("")]
        public string refreshDataMethod
        {
            get;
            set;
        }


        [ScriptIgnore]
        [IgnoreDataMember]
        [DefaultValue("")]
        public string validateDataMethod
        {
            get;
            set;
        }

        [DefaultValue(false)]
        [ScriptIgnore]
        [IgnoreDataMember]
        public bool isTrackChanges
        {
            get;
            set;
        }
        #endregion

    }
}

using RIAPP.DataService.Types;
using RIAPP.DataService.Utils.Interfaces;
using System;
using System.Collections.Generic;

namespace RIAPP.DataService
{
    internal class RowGenerator
    {
        private DbSetInfo _dbSetInfo;
        private IEnumerable<object> _dataSource;
        private IDataHelper _dataHelper;
        private int fieldCnt;
        private Field[] fieldInfos;
        private Field[] pkInfos;

        public RowGenerator(DbSetInfo dbSetInfo, IEnumerable<object> dataSource, IDataHelper dataHelper)
        {
            this._dbSetInfo = dbSetInfo;
            this._dataSource = dataSource;
            this._dataHelper = dataHelper;
            this.fieldInfos = this._dbSetInfo.GetInResultFields();
            this.fieldCnt = this.fieldInfos.Length;
            this.pkInfos = this._dbSetInfo.GetPKFields();
        }

        public IEnumerable<Row> CreateRows(int rowCount)
        {
            Row[] rows = new Row[rowCount];
            int counter = 0;
            foreach (object entity in this._dataSource)
            {
                Row row = CreateRow(entity);
                rows[counter] = row;
                ++counter;
            }
            return rows;
        }

        public IEnumerable<Row> CreateDistinctRows(ref int rowCount)
        {
            //map rows by PK
            Dictionary<string, Row> rows = new Dictionary<string, Row>(rowCount);
            int counter = 0;
            foreach (object entity in this._dataSource)
            {
                Row row = CreateRow(entity);
                //here we filter out repeated rows
                if (!rows.ContainsKey(row.k))
                {
                    rows.Add(row.k, row);
                    ++counter;
                }
            }
            rowCount = counter;
            return rows.Values;
        }

        private Row CreateRow(object entity)
        {
            Row row = new Row();
            string[] pk = new string[this.pkInfos.Length];
            row.v = new object[this.fieldCnt];
            for (int i = 0; i < this.fieldCnt; ++i)
            {
                Field fieldInfo = this.fieldInfos[i];
                object fv = this._dataHelper.SerializeField(entity, fieldInfo);

                int keyIndex = Array.IndexOf(this.pkInfos, fieldInfo);
                if (keyIndex > -1)
                {
                    if (fv == null)
                        throw new Exception(string.Format("Primary Key Field \"{0}\" Has a NULL Value", fieldInfo._FullName));
                    pk[keyIndex] = fv.ToString();
                }
                row.v[i] = fv;
            }
            row.k = string.Join(";", pk);
            return row;
        }
    }
}

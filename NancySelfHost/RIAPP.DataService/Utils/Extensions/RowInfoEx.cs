using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Security;
using System.Reflection;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Utils
{
    public static class RowInfoEx
    {
        public static object[] GetPKValues(this RowInfo rowInfo, IDataHelper dataHelper)
        {
            Type entityType = rowInfo.dbSetInfo.EntityType;
            Field[] finfos = rowInfo.dbSetInfo.GetPKFields();
            object[] result = new object[finfos.Length];
            for (int i = 0; i < finfos.Length; ++i)
            {
                ValueChange fv = rowInfo.values.Single(v => v.fieldName == finfos[i].fieldName);
                result[i] = dataHelper.DeserializeField(entityType, finfos[i], fv.val);
            }
            return result;
        }

        public static string GetRowKeyAsString(this RowInfo rowInfo)
        {
            Field[] finfos = rowInfo.dbSetInfo.GetPKFields();
            string[] vals = new string[finfos.Length];
            for (int i = 0; i < finfos.Length; ++i)
            {
                ValueChange fv = rowInfo.values.Single(v => v.fieldName == finfos[i].fieldName);
                vals[i] = fv.val;
            }
            return string.Join(";", vals);
        }

    }
}

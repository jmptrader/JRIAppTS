using System;
using RIAPP.DataService.Types;

namespace RIAPP.DataService.Utils.Interfaces
{
    public interface IQueryHelper
    {
        System.Linq.IQueryable<T> GetPage<T>(System.Linq.IQueryable<T> entities, int pageIndex, int pageSize, int pageCount, DbSetInfo dbInfo) where T : class;
        T GetRefreshedEntity<T>(System.Linq.IQueryable<T> entities, RefreshInfo info) where T : class;
        int? GetTotalCount<T>(System.Linq.IQueryable<T> entities, FilterInfo filter, DbSetInfo dbSetInfo) where T : class;
        System.Linq.IQueryable<T> PerformFilter<T>(System.Linq.IQueryable<T> entities, FilterInfo filter, DbSetInfo dbInfo) where T : class;
        System.Linq.IQueryable<T> PerformQuery<T>(System.Linq.IQueryable<T> entities, QueryRequest queryInfo, ref int? totalCount) where T : class;
        System.Linq.IQueryable<T> PerformSort<T>(System.Linq.IQueryable<T> entities, SortInfo sort) where T : class;
    }
}

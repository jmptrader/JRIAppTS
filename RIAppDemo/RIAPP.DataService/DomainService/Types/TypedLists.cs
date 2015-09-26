using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService.Types
{
    public class DBSetList : List<DbSetInfo>
    {
    }

    public class AssocList : List<Association>
    {
    }

    public class FieldRelList : List<FieldRel>
    {
    }

    public class FieldsList : List<Field>
    {
    }

    public class MethodsList : List<MethodDescription>
    {
    }

    public class PermissionList : List<DbSetPermit>
    {
    }

    public class RowsList : List<RowInfo>
    {
    }

    public class DbSetList : List<DbSet>
    {
    }

    public class TrackAssocList : List<TrackAssoc>
    {
    }

    public class ValuesList : List<ValueChange>
    {
    }

    public class SubResultList : List<SubResult>
    {
    }

    public class IncludedResultList : List<IncludedResult>
    {
    }

    public class AssociationsDictionary : Dictionary<string, Association>
    {
        public AssociationsDictionary()
        {
        }
    }

    public class DbSetsDictionary : Dictionary<string, DbSetInfo>
    {
        public DbSetsDictionary()
        {
        }
    }

}

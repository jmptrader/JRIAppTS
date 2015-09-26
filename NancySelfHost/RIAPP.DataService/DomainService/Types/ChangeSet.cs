using System.Runtime.Serialization;
using System.Collections.Generic;

namespace RIAPP.DataService.Types
{
    [DataContract]
    public class DbSet
    {
        public DbSet()
        {
            this.rows = new RowsList();
        }

        [DataMember]
        public string dbSetName
        {
            get;
            set;
        }

        [DataMember]
        public RowsList rows
        {
            get;
            set;
        }

    }

    [DataContract]
    public class ChangeSet
    {
        public ChangeSet()
        {
            this.dbSets = new DbSetList();
            this.trackAssocs = new TrackAssocList();
        }

        [DataMember]
        public DbSetList dbSets
        {
            get;
            set;
        }

        [DataMember]
        public ErrorInfo error
        {
            get;
            set;
        }

        [DataMember]
        public TrackAssocList trackAssocs
        {
            get;
            set;
        }
    }
}

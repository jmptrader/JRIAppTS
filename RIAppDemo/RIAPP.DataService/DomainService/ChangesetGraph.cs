using RIAPP.DataService.Resources;
using RIAPP.DataService.Types;
using RIAPP.DataService.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAPP.DataService
{
    public class ParentChildNode
    {
        private Association _assoc;

        public ParentChildNode(RowInfo childRow)
        {
            this.ChildRow = childRow;
        }

        public RowInfo ChildRow
        {
            get;
            set;
        }

        public RowInfo ParentRow
        {
            get;
            set;
        }

        public Association association
        {
            get
            {
                return _assoc;
            }
            set
            {
                this._assoc = value;
            }
        }

    }

    internal class ChangeSetGraph
    {
        private ChangeSet _changeSet;
        private CachedMetadata _metadata;
        LinkedList<ParentChildNode> updateNodes = new LinkedList<ParentChildNode>();
        private DbSet[] sortedDbSets = null;
        LinkedList<RowInfo> _insertList = new LinkedList<RowInfo>();
        LinkedList<RowInfo> _deleteList = new LinkedList<RowInfo>();
        LinkedList<RowInfo> _updateList = new LinkedList<RowInfo>();
        LinkedList<RowInfo> _allList = new LinkedList<RowInfo>();
            
        
        public ChangeSetGraph(ChangeSet changeSet, CachedMetadata metadata)
        {
            this._changeSet = changeSet;
            this._metadata = metadata;
        }

        private void getAllParentDbSets(LinkedList<string> list, string dbSetName)
        {
            var parentDbNames = this._metadata.associations.Values.Where((a) => a.childDbSetName == dbSetName).Select(x => x.parentDbSetName).ToArray();
            foreach (string name in parentDbNames)
            {
                list.AddLast(name);
                getAllParentDbSets(list, name);
            }
        }

        private int DbSetComparison(DbSet dbSet1, DbSet dbSet2)
        {
            var parentDbNames = new LinkedList<string>();
            this.getAllParentDbSets(parentDbNames,dbSet1.dbSetName);
            var names1 = parentDbNames.ToArray();
            if (Array.IndexOf(names1, dbSet2.dbSetName) > -1) 
            {
                return 1;
            }
            parentDbNames.Clear();
            this.getAllParentDbSets(parentDbNames, dbSet2.dbSetName);
            var names2 = parentDbNames.ToArray();
            if (Array.IndexOf(names2, dbSet1.dbSetName) > -1)
            {
                return -1;
            }
            return String.Compare(dbSet1.dbSetName,dbSet2.dbSetName);
        }

        private static string GetKey(RowInfo rowInfo)
        {
            return string.Format("{0}:{1}", rowInfo.dbSetInfo.dbSetName, rowInfo.clientKey);
        }

        private Dictionary<string, RowInfo> GetRowsMap() 
        {
            Dictionary<string, RowInfo> result = new Dictionary<string, RowInfo>();
            foreach (var dbSet in changeSet.dbSets)
            {
                DbSetInfo dbSetInfo = this._metadata.dbSets[dbSet.dbSetName];
                if (dbSetInfo.EntityType == null)
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_DB_ENTITYTYPE_INVALID, dbSetInfo.dbSetName));

                foreach (RowInfo rowInfo in dbSet.rows)
                {
                    rowInfo.dbSetInfo = dbSetInfo;
                    result.Add(GetKey(rowInfo), rowInfo);
                }
            }
            return result;
        }

        public void Prepare()
        {
            var rowsMap = this.GetRowsMap();
       
            foreach (var trackAssoc in changeSet.trackAssocs)
            {
                var assoc = this._metadata.associations[trackAssoc.assocName];
                string pkey=string.Format("{0}:{1}", assoc.parentDbSetName, trackAssoc.parentKey);
                string ckey = string.Format("{0}:{1}", assoc.childDbSetName, trackAssoc.childKey);
                RowInfo parent = rowsMap[pkey];
                RowInfo child = rowsMap[ckey];
                ParentChildNode childNode = new ParentChildNode(child);
                childNode.association = assoc;
                childNode.ParentRow = parent;
                updateNodes.AddLast(childNode);
            }


            foreach (var dbSet in this.GetSortedDbSets())
            {
                foreach (RowInfo rowInfo in dbSet.rows)
                {
                    DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
                    _allList.AddLast(rowInfo);
                    switch (rowInfo.changeType)
                    {
                        case ChangeType.Added:
                            _insertList.AddLast(rowInfo);
                            break;
                        case ChangeType.Deleted:
                            _insertList.AddFirst(rowInfo);
                            break;
                        case ChangeType.Updated:
                            _updateList.AddLast(rowInfo);
                            break;
                        default:
                            throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_CHANGETYPE_INVALID, dbSetInfo.EntityType.Name, rowInfo.changeType));
                    }
                }
            }
      
        }

        public DbSet[] GetSortedDbSets()
        {
            if (sortedDbSets == null)
            {
                var array = this._changeSet.dbSets.ToArray();
                Array.Sort(array, DbSetComparison);
                sortedDbSets = array;
            }
            return sortedDbSets;
        }

        public ChangeSet changeSet
        {
            get 
            {
                return this._changeSet;
            }
        }

        public ParentChildNode[] GetChildren(RowInfo parent)
        {
            return this.updateNodes.Where(u => u.ParentRow == parent).ToArray();
        }

        public ParentChildNode[] GetParents(RowInfo child)
        {
            return this.updateNodes.Where(u => u.ChildRow == child).ToArray();
        }

        public IEnumerable<RowInfo> insertList
        {
            get
            {
                return this._insertList;
            }
        }

        public IEnumerable<RowInfo> updateList
        {
            get
            {
                return this._updateList;
            }
        }

        public IEnumerable<RowInfo> deleteList
        {
            get
            {
                return this._deleteList;
            }
        }

        public IEnumerable<RowInfo> allList
        {
            get
            {
                return this._allList;
            }
        }
    }
}

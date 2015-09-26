using RIAPP.DataService.Types;
using System.Security.Principal;
using System.Dynamic;

namespace RIAPP.DataService
{
    public class RequestContext
    {
        private ChangeSet _currentChangeSet;

        private DbSet _currentDbSet;

        private RowInfo _currentRowInfo;

        private QueryRequest _currentQueryInfo;

        private ServiceOperationType _currentOperation;

        private IPrincipal _user;

        private dynamic _dataBag;

        public RequestContext(IPrincipal principal)
        {
            this._user = principal;
            this._dataBag = null;
        }

        public IPrincipal User
        {
            get { return this._user; }
        }

        public DbSet CurrentDbSet
        {
            get { return _currentDbSet; }
            set { _currentDbSet = value; }
        }

        public ChangeSet CurrentChangeSet
        {
            get { return _currentChangeSet; }
            set { _currentChangeSet = value; }
        }

        public RowInfo CurrentRowInfo
        {
            get { return _currentRowInfo; }
            set { _currentRowInfo = value; }
        }

        public QueryRequest CurrentQueryInfo
        {
            get { return _currentQueryInfo; }
            set { _currentQueryInfo = value; }
        }

        public ServiceOperationType CurrentOperation
        {
            get { return _currentOperation; }
            set { _currentOperation = value; }
        }

        public dynamic DataBag
        {
            get {
                if (this._dataBag == null)
                    this._dataBag = new ExpandoObject();
                return _dataBag; 
            }
        }
    }
}

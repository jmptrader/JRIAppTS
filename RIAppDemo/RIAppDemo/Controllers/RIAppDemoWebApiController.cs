using System.Net;
using System.Net.Http;
using System.Web.Http;
using RIAPP.DataService.Types;
using RIAppDemo.BLL.DataServices;
using RIAPP.DataService.WebApi;
using System.Threading.Tasks;

namespace RIAppDemo.Controllers
{
    public class RIAppDemoWebApiController : BaseWebApiController<RIAppDemoService>
    {
        public RIAppDemoWebApiController()
        {
        }
    }
}

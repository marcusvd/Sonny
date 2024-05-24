using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class FnFixedExpensesTrackingController : ControllerBase
    {
        private readonly IFnFixedExpensesTrackingServices _iFnFixedExpensesTrackingServices;

        public FnFixedExpensesTrackingController(IFnFixedExpensesTrackingServices IFnFixedExpensesTrackingServices)
        {
            _iFnFixedExpensesTrackingServices = IFnFixedExpensesTrackingServices;
        }

        [HttpPost("AddEssentialExpenses")]
        public async Task<IActionResult> AddEssentialExpenses(FixedExpensesTrackingDto entityDto)
        {
            var EntityToDb = await _iFnFixedExpensesTrackingServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }
        [HttpGet("AddEssentialExpensesTest/{companyId:min(0)}")]
        public void AddEssentialExpensesTest(int companyId)
        {
            _iFnFixedExpensesTrackingServices.AddEssentialExpensesTest(companyId);

        }
    }
}
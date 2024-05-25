using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Pagination.Models;

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


        [HttpGet("GetAllFixedExpensesTrackingPagedAsync")]
        public async Task<IActionResult> GetAllFixedExpensesTrackingPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iFnFixedExpensesTrackingServices.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("GetAllFixedExpensesTrackingByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllFixedExpensesTrackingByIdCompanyAsync(int id)
        {
           var entityFromDb = await _iFnFixedExpensesTrackingServices.GetAllByCompanyIdAsync(id);
            return Ok(entityFromDb);
        }


        [HttpGet("AddEssentialExpensesTest/{companyId:min(0)}")]
        public void AddEssentialExpensesTest(int companyId)
        {
            _iFnFixedExpensesTrackingServices.AddEssentialExpensesTest(companyId);

        }
    }
}
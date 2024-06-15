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
    public class MonthFixedExpensesTrackingController : ControllerBase
    {
        private readonly IMonthFixedExpensesTrackingServices _iMonthFixedExpensesTrackingServices;

        public MonthFixedExpensesTrackingController(IMonthFixedExpensesTrackingServices IMonthFixedExpensesTrackingServices)
        {
            _iMonthFixedExpensesTrackingServices = IMonthFixedExpensesTrackingServices;
        }

        [HttpPost("AddEssentialExpenses")]
        public async Task<IActionResult> AddEssentialExpenses(MonthFixedExpensesTrackingDto entityDto)
        {
            var EntityToDb = await _iMonthFixedExpensesTrackingServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }


        [HttpGet("GetAllFixedExpensesTrackingPagedAsync")]
        public async Task<IActionResult> GetAllFixedExpensesTrackingPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iMonthFixedExpensesTrackingServices.GetAllPagedAsync(Params);
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
            var entityFromDb = await _iMonthFixedExpensesTrackingServices.GetAllByCompanyIdAsync(id);
            return Ok(entityFromDb);
        }

        [HttpGet("GetFixedExpensesTrackingByIdAllIncluded/{FixedExpensesTrackingId:min(1)}")]
        public async Task<IActionResult> GetFixedExpensesTrackingByIdAllIncluded(int FixedExpensesTrackingId)
        {
            var returnFromDb = await _iMonthFixedExpensesTrackingServices.GetByIdAllIncluded(FixedExpensesTrackingId);

            return Ok(returnFromDb);
        }


        // [HttpGet("AddEssentialExpensesTest/{companyId:min(1)}")]
        // public void AddEssentialExpensesTest(int companyId)
        // {
        //     _iMonthFixedExpensesTrackingServices.AddEssentialExpensesTest(companyId);

        // }

        [HttpPut("UpdateFnFixedExpensesTracking/{FixedExpensesTrackingId:min(1)}")]
        public async Task<IActionResult> Update(int fixedExpensesTrackingId, [FromBody] MonthFixedExpensesTrackingDto entityDto)
        {
            var statusCode = await _iMonthFixedExpensesTrackingServices.UpdateAsync(fixedExpensesTrackingId, entityDto);
            return Ok(statusCode);
        }


    }
}
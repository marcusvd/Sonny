using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Pagination.Models;
using Application.Services.Operations.Finances.MonthlyExpenses;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class MonthlyFixedExpensesTrackingsController : ControllerBase
    {
        private readonly IMonthlyFixedExpensesTrackingServices _iMonthlyFixedExpensesTrackingServices;

        public MonthlyFixedExpensesTrackingsController(IMonthlyFixedExpensesTrackingServices IMonthlyFixedExpensesTrackingServices)
        {
            _iMonthlyFixedExpensesTrackingServices = IMonthlyFixedExpensesTrackingServices;
        }

        [HttpPost("AddEssentialExpenses")]
        public async Task<IActionResult> AddEssentialExpenses(MonthlyFixedExpenseTrackingDto entityDto)
        {
            var EntityToDb = await _iMonthlyFixedExpensesTrackingServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }


        [HttpGet("GetAllFixedExpensesTrackingPagedAsync")]
        public async Task<IActionResult> GetAllFixedExpensesTrackingPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iMonthlyFixedExpensesTrackingServices.GetAllPagedAsync(Params);
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
            var entityFromDb = await _iMonthlyFixedExpensesTrackingServices.GetAllByCompanyIdAsync(id);
            return Ok(entityFromDb);
        }

        [HttpGet("GetFixedExpensesTrackingByIdAllIncluded/{FixedExpensesTrackingId:min(1)}")]
        public async Task<IActionResult> GetFixedExpensesTrackingByIdAllIncluded(int FixedExpensesTrackingId)
        {
            var returnFromDb = await _iMonthlyFixedExpensesTrackingServices.GetByIdAllIncluded(FixedExpensesTrackingId);

            return Ok(returnFromDb);
        }


        [HttpPut("UpdateFnFixedExpensesTracking/{FixedExpensesTrackingId:min(1)}")]
        public async Task<IActionResult> Update(int fixedExpensesTrackingId, [FromBody] MonthlyFixedExpenseTrackingDto entityDto)
        {
            var statusCode = await _iMonthlyFixedExpensesTrackingServices.UpdateAsync(fixedExpensesTrackingId, entityDto);
            return Ok(statusCode);
        }


    }
}
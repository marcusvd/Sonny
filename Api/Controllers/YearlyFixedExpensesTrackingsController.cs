using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Pagination.Models;
using Application.Services.Operations.Finances.YearlyExpenses;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    
    public class YearlyFixedExpensesTrackingsController : ControllerBase
    {
        private readonly IYearlyFixedExpensesTrackingServices _iYearlyFixedExpensesTrackingServices;

        public YearlyFixedExpensesTrackingsController(IYearlyFixedExpensesTrackingServices IYearlyFixedExpensesTrackingServices)
        {
            _iYearlyFixedExpensesTrackingServices = IYearlyFixedExpensesTrackingServices;
        }

        [HttpPost("AddYearlyFixedExpensesTracking")]
        public async Task<IActionResult> AddEssentialExpenses(YearlyFixedExpenseTrackingDto entityDto)
        {
            var EntityToDb = await _iYearlyFixedExpensesTrackingServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }


        [HttpGet("GetAllYearlyFixedExpensesTrackingPagedAsync")]
        public async Task<IActionResult> GetAllYearlyFixedExpensesTrackingPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iYearlyFixedExpensesTrackingServices.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("GetAllYearlyFixedExpensesTrackingsByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllYearlyFixedExpensesTrackingsByIdCompanyAsync(int id)
        {
            var entityFromDb = await _iYearlyFixedExpensesTrackingServices.GetAllByCompanyIdAsync(id);
            return Ok(entityFromDb);
        }

        [HttpGet("GetYearlyFixedExpenseTrackingByIdAllIncluded/{FixedExpensesTrackingId:min(1)}")]
        public async Task<IActionResult> GetYearlyFixedExpenseTrackingByIdAllIncluded(int FixedExpensesTrackingId)
        {
            var returnFromDb = await _iYearlyFixedExpensesTrackingServices.GetByIdAllIncluded(FixedExpensesTrackingId);

            return Ok(returnFromDb);
        }


        // [HttpGet("AddEssentialExpensesTest/{companyId:min(1)}")]
        // public void AddEssentialExpensesTest(int companyId)
        // {
        //     _iYearlyFixedExpensesTrackingServices.AddEssentialExpensesTest(companyId);

        // }

        [HttpPut("UpdateYearlyFixedExpenseTracking/{fixedExpenseTrackingId:min(1)}")]
        public async Task<IActionResult> UpdateYearlyFixedExpensesTracking(int fixedExpenseTrackingId, [FromBody] YearlyFixedExpenseTrackingDto entityDto)
        {
            var statusCode = await _iYearlyFixedExpensesTrackingServices.UpdateAsync(fixedExpenseTrackingId, entityDto);
            return Ok(statusCode);
        }


    }
}
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
    public class MonthFixedExpensesFillersController : ControllerBase
    {
        private readonly IMonthFixedExpensesFillersServices _iMonthFixedExpensesFillersServices;

        public MonthFixedExpensesFillersController(IMonthFixedExpensesFillersServices IMonthFixedExpensesFillersServices)
        {
            _iMonthFixedExpensesFillersServices = IMonthFixedExpensesFillersServices;
        }

        // [HttpPost("AddFixedExpenses")]
        // public async Task<IActionResult> AddFixedExpenses([FromBody] MonthFixedExpensesDto entityDto)
        // {
        //     MonthFixedExpensesDto EntityToDb = await _iMonthFixedExpensesFillersServices.AddAsync(entityDto);
        //     return Ok(EntityToDb);
        // }
        
        // [HttpPost("AddFixedExpensesFillers")]
        // public async Task<IActionResult> AddFixedExpensesFillers([FromBody] MonthFixedExpensesFillersDto entityDto)
        // {
        //     var EntityToDb = await _iMonthFixedExpensesFillersServices.AddMonthFixedExpensesFillersAsync(entityDto);
        //     return Ok(EntityToDb);
        // }

        [HttpGet("GetAllMonthFixedExpensesFillersByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllFixedExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iMonthFixedExpensesFillersServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

        // [HttpGet("GetAllFixedExpensesPagedAsync")]
        // public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
        // {
        //     var returnFromDb = await _iMonthFixedExpensesFillersServices.GetAllPagedAsync(Params);
        //     if (returnFromDb == null) return null;

        //     Response.AddPagination(returnFromDb.CurrentPg,
        //                            returnFromDb.TotalPgs,
        //                            returnFromDb.PgSize,
        //                            returnFromDb.TotalCount,
        //                            returnFromDb.HasPrevious,
        //                            returnFromDb.HasNext);
        //     return Ok(returnFromDb.EntitiesToShow);
        // }

        // [HttpGet("GetFixedExpensesByIdAllIncluded/{fixedExpensesId:min(1)}")]
        // public async Task<IActionResult> GetFixedExpensesByIdAllIncluded(int fixedExpensesId)
        // {
        //     var returnFromDb = await _iMonthFixedExpensesFillersServices.GetByIdAllIncluded(fixedExpensesId);

        //     return Ok(returnFromDb);
        // }

    }
}
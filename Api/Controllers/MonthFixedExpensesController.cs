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
    public class MonthFixedExpensesController : ControllerBase
    {
        private readonly IMonthFixedExpensesServices _iMonthFixedExpensesServices;

        public MonthFixedExpensesController(IMonthFixedExpensesServices IMonthFixedExpensesServices)
        {
            _iMonthFixedExpensesServices = IMonthFixedExpensesServices;
        }

        [HttpPost("AddFixedExpenses")]
        public async Task<IActionResult> AddFixedExpenses([FromBody] MonthFixedExpensesDto entityDto)
        {
            MonthFixedExpensesDto EntityToDb = await _iMonthFixedExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpPost("AddFixedExpensesFillers")]
        public async Task<IActionResult> AddFixedExpensesFillers([FromBody] MonthFixedExpensesFillersDto entityDto)
        {
            var EntityToDb = await _iMonthFixedExpensesServices.AddMonthFixedExpensesFillersAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllFixedExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllFixedExpensesByCompanyId(int companyId)
        {
            //Create Month FixedExpenses Tracking For NewYear
            bool resdult = await _iMonthFixedExpensesServices.CreateMonthFixedExpensesTrackingForNewYear(companyId);
            var EntityFromDb = await _iMonthFixedExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

        [HttpGet("GetAllFixedExpensesPagedAsync")]
        public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iMonthFixedExpensesServices.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("GetFixedExpensesByIdAllIncluded/{fixedExpensesId:min(1)}")]
        public async Task<IActionResult> GetFixedExpensesByIdAllIncluded(int fixedExpensesId)
        {
            var returnFromDb = await _iMonthFixedExpensesServices.GetByIdAllIncluded(fixedExpensesId);

            return Ok(returnFromDb);
        }

    }
}
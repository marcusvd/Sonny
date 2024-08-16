using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Pagination.Models;
using Application.Services.Operations.Finances.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;



namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class MonthlyFixedExpensesController : ControllerBase
    {
        private readonly IMonthlyFixedExpensesServices _iMonthlyFixedExpensesServices;

        public MonthlyFixedExpensesController(IMonthlyFixedExpensesServices IMonthlyFixedExpensesServices)
        {
            _iMonthlyFixedExpensesServices = IMonthlyFixedExpensesServices;
        }

        [HttpPost("AddFixedExpenses")]
        public async Task<IActionResult> AddFixedExpenses([FromBody] MonthlyFixedExpenseDto entityDto)
        {
            MonthlyFixedExpenseDto EntityToDb = await _iMonthlyFixedExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpPost("AddCategoryExpenses")]
        public async Task<IActionResult> AddFixedExpensesFillers([FromBody] CategoryExpenseDto entityDto)
        {
            var EntityToDb = await _iMonthlyFixedExpensesServices.AddCategoryExpensesAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllFixedExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllFixedExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iMonthlyFixedExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }
        [HttpGet("CreateMonthlyFixedExpensesTrackingForNewYear/{companyId:min(1)}")]
        public async Task<IActionResult> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId)
        {
            //Create Monthly FixedExpenses Tracking For NewYear
            bool resdult = await _iMonthlyFixedExpensesServices.CreateMonthlyFixedExpensesTrackingForNewYear(companyId);
            return Ok(resdult);
        }

        [HttpGet("GetAllFixedExpensesPagedAsync")]
        public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iMonthlyFixedExpensesServices.GetAllPagedAsync(Params);
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
            var returnFromDb = await _iMonthlyFixedExpensesServices.GetByIdAllIncluded(fixedExpensesId);

            return Ok(returnFromDb);
        }

    }
}
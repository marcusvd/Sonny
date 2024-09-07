using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Pagination.Models;
using Application.Services.Operations.Finances.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;



namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _FN_CreditCardExpensesController : ControllerBase
    {
        private readonly ICreditCardExpensesServices _iCreditCardExpensesServices;

        public _FN_CreditCardExpensesController(ICreditCardExpensesServices ICreditCardExpensesServices)
        {
            _iCreditCardExpensesServices = ICreditCardExpensesServices;
        }

        [HttpPost("AddCreditCardExpense")]
        public async Task<IActionResult> AddCreditCardExpense([FromBody] CreditCardExpenseDto entityDto)
        {
            var EntityToDb = await _iCreditCardExpensesServices.AddRangeAsync(entityDto);
            return Ok(EntityToDb);
        }

        // [HttpPost("AddCategoryExpenses")]
        // public async Task<IActionResult> AddFixedExpensesFillers([FromBody] CategoryExpenseDto entityDto)
        // {
        //     var EntityToDb = await _iMonthlyFixedExpensesServices.AddCategoryExpensesAsync(entityDto);
        //     return Ok(EntityToDb);
        // }

        [HttpGet("GetAllCreditCardExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllCreditCardExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iCreditCardExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }
        // [HttpGet("CreateMonthlyFixedExpensesTrackingForNewYear/{companyId:min(1)}")]
        // public async Task<IActionResult> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId)
        // {
        //     //Create Monthly FixedExpenses Tracking For NewYear
        //     bool resdult = await _iMonthlyFixedExpensesServices.CreateMonthlyFixedExpensesTrackingForNewYear(companyId);
        //     return Ok(resdult);
        // }

        // [HttpGet("GetAllFixedExpensesPagedAsync")]
        // public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
        // {
        //     var returnFromDb = await _iMonthlyFixedExpensesServices.GetAllPagedAsync(Params);
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
        //     var returnFromDb = await _iMonthlyFixedExpensesServices.GetByIdAllIncluded(fixedExpensesId);

        //     return Ok(returnFromDb);
        // }

        // [HttpPut("UpdateMonthlyFixedExpense/{monthlyfixedExpenseId:min(1)}")]
        // public async Task<IActionResult> UpdateMonthlyFixedExpense(int monthlyfixedExpenseId, [FromBody] MonthlyFixedExpenseDto entityDto)
        // {
        //     var statusCode = await _iMonthlyFixedExpensesServices.UpdateAsync(monthlyfixedExpenseId, entityDto);
        //     return Ok(statusCode);
        // }


        

    }
}
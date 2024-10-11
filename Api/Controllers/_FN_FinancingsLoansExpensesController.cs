using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Pagination.Models;
using Application.Services.Operations.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _FN_FinancingsLoansExpensesController : ControllerBase
    {
        private readonly IFinancingsAndLoansExpensesServices _iFinancingsAndLoansExpensesServices;

        public _FN_FinancingsLoansExpensesController(IFinancingsAndLoansExpensesServices IFinancingsAndLoansExpensesServices)
        {
            _iFinancingsAndLoansExpensesServices = IFinancingsAndLoansExpensesServices;
        }

        [HttpPost("AddFinancingsAndLoansExpenses")]
        public async Task<IActionResult> AddFinancingsAndLoansExpenses([FromBody] FinancingAndLoanExpenseDto entityDto)
        {
            var statusCode = await _iFinancingsAndLoansExpensesServices.AddRangeAsync(entityDto);
            return Ok(statusCode);
        }

        [HttpGet("GetAllFinancingsAndLoansExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllFinancingsAndLoansExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iFinancingsAndLoansExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

        [HttpGet("FinancingsAndLoansGetAllExpensesPagedAsync")]
        public async Task<IActionResult> GetAllExpensesPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iFinancingsAndLoansExpensesServices.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("GetFinancingsAndLoansGetExpensesByIdAllIncluded/{ExpensesId:min(1)}")]
        public async Task<IActionResult> GetFinancingsAndLoansGetExpensesByIdAllIncluded(int ExpensesId)
        {
            var returnFromDb = await _iFinancingsAndLoansExpensesServices.GetByIdAllIncluded(ExpensesId);

            return Ok(returnFromDb);
        }

        // [HttpPut("UpdateFinancingsAndLoans/{financingsAndLoansId:min(1)}")]
        // public async Task<IActionResult> UpdateFinancingsAndLoans(int financingsAndLoansId, [FromBody] FinancingAndLoanExpenseDto entityDto)
        // {
        //     var statusCode = await _iFinancingsAndLoansExpensesServices.UpdateAsync(financingsAndLoansId, entityDto);
        //     return Ok(statusCode);
        // }

    }
}
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
            FinancingAndLoanExpenseDto EntityToDb = await _iFinancingsAndLoansExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
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

        [HttpGet("FinancingsAndLoansGetExpensesByIdAllIncluded/{ExpensesId:min(1)}")]
        public async Task<IActionResult> GetExpensesByIdAllIncluded(int ExpensesId)
        {
            var returnFromDb = await _iFinancingsAndLoansExpensesServices.GetByIdAllIncluded(ExpensesId);

            return Ok(returnFromDb);
        }

    }
}
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
    public class FinancingsLoansExpensesController : ControllerBase
    {
        private readonly IFinancingsAndLoansExpensesServices _iFinancingsAndLoansExpensesServices;
        public FinancingsLoansExpensesController(IFinancingsAndLoansExpensesServices IFinancingsAndLoansExpensesServices)

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

        [HttpGet("GetAllFinancingsAndLoansPagedAsync")]
        public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
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

        [HttpGet("GetFinancingsAndLoansByIdAllIncluded/{fixedExpensesId:min(1)}")]
        public async Task<IActionResult> GetFinancingsAndLoansByIdAllIncluded(int fixedExpensesId)
        {
            var returnFromDb = await _iFinancingsAndLoansExpensesServices.GetByIdAllIncluded(fixedExpensesId);

            return Ok(returnFromDb);
        }

    }
}
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Finances.VariableDebitExpenses;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class VariableExpensesController : ControllerBase
    {
        private readonly IVariableExpensesServices _iVariableExpensesServices;

        public VariableExpensesController(IVariableExpensesServices IVariableExpensesServices)
        {
            _iVariableExpensesServices = IVariableExpensesServices;
        }

        [HttpPost("AddVariableExpenses")]
        public async Task<IActionResult> AddVariableExpenses(VariableExpensesDto entityDto)
        {
            var ToDb = await _iVariableExpensesServices.AddAsync(entityDto);
            return Ok(ToDb);
        }

        [HttpGet("GetAllVariableExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllVariableExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iVariableExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

        // [HttpGet("GetAllFinancingLoan")]
        // public async Task<IActionResult> GetAllFinancingLoan()
        // {
        //     FinancingLoanDto[] EntityFromDb = await _FINANCING_LOAN.GetAllAsync();
        //     return Ok(EntityFromDb);
        // }
    }
}
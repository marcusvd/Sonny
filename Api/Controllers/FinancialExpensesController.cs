using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class FinancialExpensesController : ControllerBase
    {
        private readonly IFinancialExpensesServices _iFinancialExpensesServices;

        public FinancialExpensesController(IFinancialExpensesServices IFinancialExpensesServices)
        {
            _iFinancialExpensesServices = IFinancialExpensesServices;
        }

        [HttpPost("AddExpenses")]
        public async Task<IActionResult> AddExpenses([FromBody] FinancialExpensesDto entityDto)
        {
            FinancialExpensesDto EntityToDb = await _iFinancialExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllExpenses/{companyId:min(0)}")]
        public async Task<IActionResult> GetAllFinancingLoan(int companyId)
        {
            var EntityFromDb = await _iFinancialExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }
    }
}
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
    public class FinancialExpensesNotPredictableController : ControllerBase
    {
        private readonly IFinancialExpensesNotPredictableServices _iFinancialExpensesNotPredictableServices;

        public FinancialExpensesNotPredictableController(IFinancialExpensesNotPredictableServices IFinancialExpensesNotPredictableServices)
        {
            _iFinancialExpensesNotPredictableServices = IFinancialExpensesNotPredictableServices;
        }

        [HttpPost("AddNotPredictable")]
        public async Task<IActionResult> AddNotPredictable(FinancialExpensesNotPredictableDto entityDto)
        {
            var ToDb = await _iFinancialExpensesNotPredictableServices.AddAsync(entityDto);
            return Ok(ToDb);
        }

        // [HttpGet("GetAllFinancingLoan")]
        // public async Task<IActionResult> GetAllFinancingLoan()
        // {
        //     FinancingLoanDto[] EntityFromDb = await _FINANCING_LOAN.GetAllAsync();
        //     return Ok(EntityFromDb);
        // }
    }
}
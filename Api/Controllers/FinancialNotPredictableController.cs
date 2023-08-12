using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class FinancialNotPredictableController : ControllerBase
    {
        private readonly IFinancialNotPredictableServices _FINANCING_LOAN;

        public FinancialNotPredictableController(IFinancialNotPredictableServices FINANCING_LOAN)
        {
            _FINANCING_LOAN = FINANCING_LOAN;
        }

        [HttpPost("AddNotPredictable")]
        public async Task<IActionResult> AddNotPredictable(FinancialNotPredictableDto entityDto)
        {
            FinancialNotPredictableDto EntityToDb = await _FINANCING_LOAN.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        // [HttpGet("GetAllFinancingLoan")]
        // public async Task<IActionResult> GetAllFinancingLoan()
        // {
        //     FinancingLoanDto[] EntityFromDb = await _FINANCING_LOAN.GetAllAsync();
        //     return Ok(EntityFromDb);
        // }
    }
}
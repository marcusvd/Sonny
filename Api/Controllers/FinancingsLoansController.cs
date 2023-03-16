using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.Financial;
using Application.Services.Contracts.Financial;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class FinancingsLoansController : ControllerBase
    {
        private readonly IFinancingLoanServices _FINANCING_LOAN;

        public FinancingsLoansController(IFinancingLoanServices FINANCING_LOAN)
        {
            _FINANCING_LOAN = FINANCING_LOAN;
        }

        [HttpPost("FinancingLoan")]
        public async Task<IActionResult> PostFinancingLoan(FinancingLoanDto entityDto)
        {
            FinancingLoanDto EntityToDb = await _FINANCING_LOAN.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllFinancingLoan")]
        public async Task<IActionResult> GetAllFinancingLoan()
        {
            FinancingLoanDto[] EntityFromDb = await _FINANCING_LOAN.GetAllAsync();
            return Ok(EntityFromDb);
        }
    }
}
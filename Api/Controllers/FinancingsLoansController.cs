using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Dto.Financial;
using Services.Services.Contracts.Financial;

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

        [HttpPost]
        public async Task<IActionResult> Post(FinancingLoanDto entityDto)
        {

            FinancingLoanDto EntityToDb = await _FINANCING_LOAN.AddAsync(entityDto);
            if (_FINANCING_LOAN == null) return NoContent();
            return Ok(EntityToDb);

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            FinancingLoanDto[] EntityFromDb = await _FINANCING_LOAN.GetAllAsync();
            if (EntityFromDb == null) return NotFound();
            return Ok(EntityFromDb);

        }
    }
}
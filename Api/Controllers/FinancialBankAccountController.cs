using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class FinancialBankAccountsController : ControllerBase
    {
        private readonly IFinancialBankAccountServices _BANK_ACCOUNT_SERVICES;

        public FinancialBankAccountsController(IFinancialBankAccountServices BANK_ACCOUNT_SERVICES)
        {
            _BANK_ACCOUNT_SERVICES = BANK_ACCOUNT_SERVICES;
        }

        [HttpPost("AddABankAccount")]
        public async Task<IActionResult> AddABankAccount([FromBody] FinancialBankAccountDto entityDto)
        {
            FinancialBankAccountDto EntityToDb = await _BANK_ACCOUNT_SERVICES.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        // [HttpGet("GetAllFinancialBankAccount")]
        // public async Task<IActionResult> GetAllFinancialBankAccount()
        // {
        //     FinancialBankAccountDto[] EntityFromDb = await _BANK_ACCOUNT_SERVICES.GetAllAsync();
        //     if (EntityFromDb == null) return NotFound();
        //     return Ok(EntityFromDb);
        // }
    }
}
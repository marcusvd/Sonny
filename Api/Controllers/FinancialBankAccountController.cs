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
    public class FinancialBankAccountsController : ControllerBase
    {
        private readonly IFinancialBankAccountServices _iFinancialBankAccountServices;

        public FinancialBankAccountsController(IFinancialBankAccountServices IFinancialBankAccountServices)
        {
            _iFinancialBankAccountServices = IFinancialBankAccountServices;
        }

        [HttpPost("AddABankAccount")]
        public async Task<IActionResult> AddABankAccount([FromBody] FinancialBankAccountDto entityDto)
        {
            FinancialBankAccountDto EntityToDb = await _iFinancialBankAccountServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        // [HttpGet("GetAllFinancialBankAccount")]
        // public async Task<IActionResult> GetAllFinancialBankAccount()
        // {
        //     FinancialBankAccountDto[] EntityFromDb = await _iFinancialBankAccountServices.GetAllAsync();
        //     if (EntityFromDb == null) return NotFound();
        //     return Ok(EntityFromDb);
        // }
    }
}
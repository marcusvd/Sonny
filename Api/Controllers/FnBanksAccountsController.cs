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
    public class FnBanksAccountsController : ControllerBase
    {
        private readonly IFnBanksAccountsServices _iFnBanksAccountsServices;

        public FnBanksAccountsController(IFnBanksAccountsServices IFnBanksAccountsServices)
        {
            _iFnBanksAccountsServices = IFnBanksAccountsServices;
        }

        [HttpPost("AddABankAccount")]
        public async Task<IActionResult> AddABankAccount([FromBody] BankAccountDto entityDto)
        {
            BankAccountDto EntityToDb = await _iFnBanksAccountsServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllFnBankAccount/{companyId:min(0)}")]
        public async Task<IActionResult> GetAllFnBankAccount(int companyId)
        {
            var EntityFromDb = await _iFnBanksAccountsServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }
    }
}
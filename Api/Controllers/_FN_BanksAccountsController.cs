using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Finances.Bank;
using Application.Services.Operations.Finances.Dtos.Bank;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _FN_BanksAccountsController : ControllerBase
    {
        private readonly IFnBanksAccountsServices _iFnBanksAccountsServices;

        public _FN_BanksAccountsController(IFnBanksAccountsServices IFnBanksAccountsServices)
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

        [HttpGet("GetFnBankAccountByIdAllIncluded/{fnBankAccountId:min(1)}")]
        public async Task<IActionResult> GetFnBankAccountByIdAllIncluded(int fnBankAccountId)
        {
            var returnFromDb = await _iFnBanksAccountsServices.GetByIdAllIncluded(fnBankAccountId);

            return Ok(returnFromDb);
        }

        [HttpPut("UpdateFnBankAccount/{fnBankAccountId:min(1)}")]
        public async Task<IActionResult> Update(int fnBankAccountId, [FromBody] BankAccountDto entityDto)
        {
            var statusCode = await _iFnBanksAccountsServices.UpdateAsync(fnBankAccountId, entityDto);
            return Ok(statusCode);
        }

        [HttpPut("DeleteFakeFnBankAccount/{fnBankAccountId:min(1)}")]
        public async Task<IActionResult> DeleteFakeCustomer(int fnBankAccountId)
        {
            var statusCode = await _iFnBanksAccountsServices.DeleteFakeAsync(fnBankAccountId);
            return Ok(statusCode);
        }

    }
}
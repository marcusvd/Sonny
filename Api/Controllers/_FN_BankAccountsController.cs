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
    public class _FN_BankAccountsController : ControllerBase
    {
        private readonly IBankAccountsServices _iBanksAccountsServices;

        public _FN_BankAccountsController(IBankAccountsServices IBanksAccountsServices)
        {
            _iBanksAccountsServices = IBanksAccountsServices;
        }

        [HttpPost("AddABankAccount")]
        public async Task<IActionResult> AddABankAccount([FromBody] BankAccountDto entityDto)
        {
            var entityToView = await _iBanksAccountsServices.AddAsync(entityDto);
            return Ok(entityToView);
            
        }

        [HttpGet("GetAllFnBankAccount/{companyId:min(0)}")]
        public async Task<IActionResult> GetAllFnBankAccount(int companyId)
        {
            var EntityFromDb = await _iBanksAccountsServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }
        // [HttpGet("GetAllCards/{companyId:min(0)}")]
        // public async Task<IActionResult> GetAllCards(int companyId)
        // {
        //     var EntityFromDb = await _iBanksAccountsServices.GetAllCardsAsync(companyId);
        //     return Ok(EntityFromDb);
        // }

        [HttpGet("GetFnBankAccountByIdAllIncluded/{fnBankAccountId:min(1)}")]
        public async Task<IActionResult> GetFnBankAccountByIdAllIncluded(int fnBankAccountId)
        {
            var returnFromDb = await _iBanksAccountsServices.GetByIdAllIncluded(fnBankAccountId);

            return Ok(returnFromDb);
        }

        [HttpPut("UpdateFnBankAccount/{fnBankAccountId:min(1)}")]
        public async Task<IActionResult> Update(int fnBankAccountId, [FromBody] BankAccountDto entityDto)
        {
            var statusCode = await _iBanksAccountsServices.UpdateAsync(fnBankAccountId, entityDto);
            return Ok(statusCode);
        }

        [HttpPut("DeleteFakeFnBankAccount/{fnBankAccountId:min(1)}")]
        public async Task<IActionResult> DeleteFakeCustomer(int fnBankAccountId)
        {
            var statusCode = await _iBanksAccountsServices.DeleteFakeAsync(fnBankAccountId);
            return Ok(statusCode);
        }

    }
}
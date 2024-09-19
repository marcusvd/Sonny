using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Finances.Bank;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.CreditCardExpenses;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _FN_CreditCardExpensesInvoicesController : ControllerBase
    {
        private readonly ICreditCardExpensesInvoiceServices _iCreditCardExpensesInvoiceServices;

        public _FN_CreditCardExpensesInvoicesController(ICreditCardExpensesInvoiceServices iCreditCardExpensesInvoiceServices)
        {
            _iCreditCardExpensesInvoiceServices = iCreditCardExpensesInvoiceServices;
        }

        [HttpGet("GetAllByCardIdAsync/{cardId:min(0)}")]
        public async Task<IActionResult> GetAllCreditCardsOnlyByCompanyId(int cardId)
        {
            var EntityFromDb = await _iCreditCardExpensesInvoiceServices.GetAllByCardIdAsync(cardId);
            return Ok(EntityFromDb);
        }

    }
}
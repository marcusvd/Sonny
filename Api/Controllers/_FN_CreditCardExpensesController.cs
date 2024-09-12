using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.CreditCardExpenses;



namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _FN_CreditCardExpensesController : ControllerBase
    {
        private readonly ICreditCardExpensesInvoiceServices _iCreditCardExpensesServices;
        // private readonly ICreditCardExpensesServices _iCreditCardExpensesServices;

        public _FN_CreditCardExpensesController(ICreditCardExpensesInvoiceServices ICreditCardExpensesServices)
        {
            _iCreditCardExpensesServices = ICreditCardExpensesServices;
        }

        [HttpPost("AddCreditCardExpense")]
        public async Task<IActionResult> AddCreditCardExpense([FromBody] CreditCardExpenseInvoiceDto entityDto)
        {
            var EntityToDb = await _iCreditCardExpensesServices.AddCreditCardExpenseInvoiceAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllCreditCardExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllCreditCardExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iCreditCardExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }
        // public async Task<IActionResult> AddCreditCardExpense([FromBody] CreditCardExpenseDto entityDto)
        // {
        //     var EntityToDb = await _iCreditCardExpensesServices.AddCreditCardExpenseAsync(entityDto);
        //     return Ok(EntityToDb);
        // }

        // [HttpGet("GetAllCreditCardExpensesByCompanyId/{companyId:min(1)}")]
        // public async Task<IActionResult> GetAllCreditCardExpensesByCompanyId(int companyId)
        // {
        //     var EntityFromDb = await _iCreditCardExpensesServices.GetAllAsync(companyId);
        //     return Ok(EntityFromDb);
        // }
      
        

    }
}
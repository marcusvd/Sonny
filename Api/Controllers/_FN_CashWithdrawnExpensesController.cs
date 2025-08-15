using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Finances.VariablesDebitsExpenses;
using Application.Services.Operations.Finances.Dtos.CashWithdrawnExpenses;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _FN_CashWithdrawnExpensesController : ControllerBase
    {
        private readonly ICashWithdrawnExpensesServices _iCashWithdrawnExpensesServices;

        public _FN_CashWithdrawnExpensesController(ICashWithdrawnExpensesServices ICashWithdrawnExpensesServices)
        {
            _iCashWithdrawnExpensesServices = ICashWithdrawnExpensesServices;
        }

        [HttpPost("AddCashWithdrawnExpenses")]
        public async Task<IActionResult> AddCashWithdrawnExpenses(CashWithdrawnExpenseDto entityDto)
        {
            var toDb = await _iCashWithdrawnExpensesServices.AddAsync(entityDto);
            return Ok(toDb);
        }

        [HttpGet("GetAllCashWithdrawnExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllCashWithdrawnExpensesByCompanyId(int companyId)
        {
            var fromDb = await _iCashWithdrawnExpensesServices.GetAllAsync(companyId);
            return Ok(fromDb);
        }

        [HttpGet("GetByIdCashWithdrawnExpenses/{id:min(1)}")]
        public async Task<IActionResult> GetByIdCashWithdrawnExpenses(int id)
        {
            var fromDb = await _iCashWithdrawnExpensesServices.GetByIdFull(id);
            return Ok(fromDb);
        }
        
        [HttpPut("EditCashWithdrawnExpenses/{id:min(1)}")]
        public async Task<IActionResult> EditCashWithdrawnExpenses(int id, [FromBody] CashWithdrawnExpenseDto entityDto)
        {
            var fromDb = await _iCashWithdrawnExpensesServices.EditAsync(id, entityDto);
            return Ok(fromDb);
        }
    }
}
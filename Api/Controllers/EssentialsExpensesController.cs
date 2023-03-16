using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.Financial;
using Application.Services.Contracts.Financial;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class EssentialsExpensesController : ControllerBase
    {
        private readonly IEssentialExpenseServices _ESSENTIAL_EXPENSES_SERICES;

        public EssentialsExpensesController(IEssentialExpenseServices ESSENTIAL_EXPENSES_SERICES)
        {
            _ESSENTIAL_EXPENSES_SERICES = ESSENTIAL_EXPENSES_SERICES;
        }

        [HttpPost("EssentialExpense")]
        public async Task<IActionResult> PostEssentialExpense(EssentialExpenseDto entityDto)
        {
            EssentialExpenseDto EntityToDb = await _ESSENTIAL_EXPENSES_SERICES.AddAsync(entityDto);
            return Ok(EntityToDb);
        }
    }
}
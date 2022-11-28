using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Dto.Financial;
using Services.Services.Contracts.Financial;

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

        [HttpPost]
        public async Task<IActionResult> Post(EssentialExpenseDto entityDto)
        {
            EssentialExpenseDto EntityToDb = await _ESSENTIAL_EXPENSES_SERICES.AddAsync(entityDto);
            if (_ESSENTIAL_EXPENSES_SERICES == null) return NoContent();
            return Ok(EntityToDb);
        }
    }
}
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Application.Services.Operations.Finances.PixesExpenses;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _FN_PixesExpensesController : ControllerBase
    {
        private readonly IPixesExpensesServices _IPixesExpensesServices;

        public _FN_PixesExpensesController(IPixesExpensesServices IPixesExpensesService)
        {
            _IPixesExpensesServices = IPixesExpensesService;
        }

        [HttpPost("AddPixesExpenses")]
        public async Task<IActionResult> AddPixesExpenses([FromBody] PixExpenseDto entityDto)
        {
            var entityToView = await _IPixesExpensesServices.AddAsync(entityDto);
            return Ok(entityToView);
        }

        [HttpGet("GetAllPixesExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllPixesExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _IPixesExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

    }
}
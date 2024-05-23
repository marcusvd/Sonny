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
    public class FnFixedExpensesController : ControllerBase
    {
        private readonly IFnFixedExpensesServices _iFnFixedExpensesServices;

        public FnFixedExpensesController(IFnFixedExpensesServices IFnFixedExpensesServices)
        {
            _iFnFixedExpensesServices = IFnFixedExpensesServices;
        }

        [HttpPost("AddFixedExpenses")]
        public async Task<IActionResult> AddFixedExpenses([FromBody] FixedExpensesDto entityDto)
        {
            FixedExpensesDto EntityToDb = await _iFnFixedExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllExpenses/{companyId:min(0)}")]
        public async Task<IActionResult> GetAllFinancingLoan(int companyId)
        {
            var EntityFromDb = await _iFnFixedExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }
    }
}
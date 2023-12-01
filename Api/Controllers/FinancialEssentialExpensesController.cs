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
    public class FinancialEssentialExpensesController : ControllerBase
    {
        private readonly IFinancialEssentialExpensesServices _iFinancialEssentialExpensesServices;

        public FinancialEssentialExpensesController(IFinancialEssentialExpensesServices IFinancialEssentialExpensesServices)
        {
            _iFinancialEssentialExpensesServices = IFinancialEssentialExpensesServices;
        }

        [HttpPost("AddEssentialExpenses")]
        public async Task<IActionResult> AddEssentialExpenses(FinancialEssentialExpensesDto entityDto)
        {
            var EntityToDb = await _iFinancialEssentialExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }
    }
}
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
    public class FinancialNotPredictableController : ControllerBase
    {
        private readonly IFinancialNotPredictableServices _iFinancialNotPredictableServices;

        public FinancialNotPredictableController(IFinancialNotPredictableServices IFinancialNotPredictableServices)
        {
            _iFinancialNotPredictableServices = IFinancialNotPredictableServices;
        }

        [HttpPost("AddNotPredictable")]
        public async Task<IActionResult> AddNotPredictable(FinancialNotPredictableDto entityDto)
        {
            var ToDb = await _iFinancialNotPredictableServices.AddAsync(entityDto);
            return Ok(ToDb);
        }

        // [HttpGet("GetAllFinancingLoan")]
        // public async Task<IActionResult> GetAllFinancingLoan()
        // {
        //     FinancingLoanDto[] EntityFromDb = await _FINANCING_LOAN.GetAllAsync();
        //     return Ok(EntityFromDb);
        // }
    }
}
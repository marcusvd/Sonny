using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class FinancialEssentialCyclesController : ControllerBase
    {
        private readonly IFinancialEssentialCycleServices _ESSENTIAL_CYCLE_SERICES;

        public FinancialEssentialCyclesController(IFinancialEssentialCycleServices ESSENTIAL_CYCLE_SERICES)
        {
            _ESSENTIAL_CYCLE_SERICES = ESSENTIAL_CYCLE_SERICES;
        }

        [HttpPost("AddEssentialCycle")]
        public async Task<IActionResult> AddEssentialCycle(FinancialEssentialCycleDto entityDto)
        {
            FinancialEssentialCycleDto EntityToDb = await _ESSENTIAL_CYCLE_SERICES.AddAsync(entityDto);
            return Ok(EntityToDb);
        }
    }
}
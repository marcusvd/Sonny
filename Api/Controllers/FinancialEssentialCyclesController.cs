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
    public class FinancialEssentialCyclesController : ControllerBase
    {
        private readonly IFinancialEssentialCycleServices _iFinancialEssentialCycleServices;

        public FinancialEssentialCyclesController(IFinancialEssentialCycleServices IFinancialEssentialCycleServices)
        {
            _iFinancialEssentialCycleServices = IFinancialEssentialCycleServices;
        }

        [HttpPost("AddEssentialCycle")]
        public async Task<IActionResult> AddEssentialCycle(FinancialEssentialCycleDto entityDto)
        {
            FinancialEssentialCycleDto EntityToDb = await _iFinancialEssentialCycleServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }
    }
}
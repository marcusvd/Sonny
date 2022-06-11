using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{



    [ApiController]
    [Route("api/{controller}")]
    public class MonthlyOutFlowController : ControllerBase
    {
        private readonly IMonthlyOutFlowServices _MONTHLY_SERVICES;

        public MonthlyOutFlowController(IMonthlyOutFlowServices MONTHLY_SERVICES)
        {
            _MONTHLY_SERVICES = MONTHLY_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(MonthlyOutFlowDto record)
        {
            try
            {
                if (record == null) return NotFound();

                MonthlyOutFlowDto toRecord = await _MONTHLY_SERVICES.AddAsync(record);
                
                return Ok(toRecord);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }


    }
}
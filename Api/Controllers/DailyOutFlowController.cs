using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{



    [ApiController]
    [Route("api/{controller}")]
    public class DailyOutFlowController : ControllerBase
    {
        private readonly IDailyOutServices _DAILY_SERVICES;

        public DailyOutFlowController(IDailyOutServices DAILY_SERVICES)
        {
            _DAILY_SERVICES = DAILY_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(DailyOutFlowDto entity)
        {
            try
            {
                if (entity == null) return NotFound();

                DailyOutFlowDto toRecord = await _DAILY_SERVICES.AddAsync(entity);
                
                return Ok(toRecord);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }


    }
}
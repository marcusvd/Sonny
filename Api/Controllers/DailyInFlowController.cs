using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Dto.Financial;
using Services.Services.Contracts;


namespace Api.Controllers
{



    [ApiController]
    [Route("api/{controller}")]
    public class DailyInFlowController : ControllerBase
    {
        private readonly IDailyInServices _DAILY_SERVICES;

        public DailyInFlowController(IDailyInServices DAILY_SERVICES)
        {
            _DAILY_SERVICES = DAILY_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(DailyInFlowDto entity)
        {
            try
            {
                if (entity == null) return NotFound();
                DailyInFlowDto toRecord = await _DAILY_SERVICES.AddAsync(entity);
                return Ok(toRecord);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }


    }
}
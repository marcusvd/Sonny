using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.ServiceBudgetBench;
using Application.Services.Contracts.BudgetBench;
namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class ServicesBenchController : ControllerBase
    {
        private readonly IServiceBenchServices _SERVICEBENCH_SERVICES;
        public ServicesBenchController(IServiceBenchServices SERVICEBENCH_SERVICES)
        {
            _SERVICEBENCH_SERVICES = SERVICEBENCH_SERVICES;
        }

        [HttpGet("GetServiceBench")]
        public async Task<IActionResult> GetServiceBench()
        {
            var result = await _SERVICEBENCH_SERVICES.GetAllAsyncIncluded();
            return Ok(result);
        }

        [HttpPost("PostServiceBench")]
        public async Task<IActionResult> PostServiceBench([FromBody] ServiceBenchDto entityDto)
        {
            ServiceBenchDto returnToView = await _SERVICEBENCH_SERVICES.AddAsync(entityDto);
            return Ok(returnToView);
        }

        [HttpPut("UpdatetServiceBench/{id:int:min(1)}")]
        public async Task<IActionResult> UpdatetServiceBench(int id, [FromBody] ServiceBenchDto entityDto)
        {
            var result = await _SERVICEBENCH_SERVICES.Update(id, entityDto);
            return Ok(result);
        }
    }
}
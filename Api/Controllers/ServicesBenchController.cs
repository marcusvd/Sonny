using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Dto.ServiceBudgetBench;
using Services.Services.Contracts.BudgetBench;
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _SERVICEBENCH_SERVICES.GetAllAsyncIncluded();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(ServiceBenchDto entityDto)
        {
            ServiceBenchDto returnToView = await _SERVICEBENCH_SERVICES.AddAsync(entityDto);
            return Ok(returnToView);
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Update(int id, [FromBody] ServiceBenchDto entityDto)
        {
            var result = await _SERVICEBENCH_SERVICES.Update(id, entityDto);
            return Ok(result);
        }
    }
}
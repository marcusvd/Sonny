using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Services.Dto.ServiceBudgetBench;
using Services.Services.Contracts.BudgetBench;

namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class ServicesBudgetsController : ControllerBase
    {
        private readonly IServiceBudgetServices _SERVICEBUDGET_SERVICES;
        public ServicesBudgetsController(IServiceBudgetServices SERVICEBUDGET_SERVICES)
        {
            _SERVICEBUDGET_SERVICES = SERVICEBUDGET_SERVICES;
        }

        [HttpGet("GetAllIncludedAsync")]
        public async Task<IActionResult> GetAllIncludedAsync()
        {
            List<ServiceBudgetDto> records = await _SERVICEBUDGET_SERVICES.GetAllAsyncIncluded();
            return Ok(records);
        }

        [HttpGet("GetByIdAsyncIncluded/{id:int:min(1)}")]
        public async Task<IActionResult> GetByIdAsyncIncluded(int id)
        {
            var entitiesFromDb = await _SERVICEBUDGET_SERVICES.GetByIdAsyncIncluded(id);
            return Ok(entitiesFromDb);
        }

        [HttpPost]
        public async Task<IActionResult> Post(ServiceBudgetDto entityDto)
        {
            ServiceBudgetDto entityToDbFromDb = await _SERVICEBUDGET_SERVICES.AddAsync(entityDto);
            return Ok(entityToDbFromDb);
        }

        [HttpPut("{id:int:min(1)}")]
        public async Task<IActionResult> Update(int id, [FromBody] ServiceBudgetDto entityDto)
        {
            if (id != entityDto.Id) return BadRequest();
            var record = await _SERVICEBUDGET_SERVICES.Update(entityDto);
            return Ok(record);
        }

        // [HttpGet]
        // public async Task<IActionResult> GetAllAsync()
        // {

        //     List<ServiceBudgetDto> records = await _SERVICEBUDGET_SERVICES.GetAllAsync(false);
        //     if (records == null) return NotFound();
        //     return Ok(records);

        // }


        // [HttpGet("{id:int:min(1)}")]
        // public async Task<IActionResult> GetByIdAsync(int id)
        // {
        //         var entitiesFromDb = await _SERVICEBUDGET_SERVICES.GetByIdAsyncIncluded(id);
        //         return Ok(entitiesFromDb);
        // }


    }
}
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
// using System.Collections.Generic;
// using Application.Dto.ServiceBudgetBench;
// using Application.Services.Contracts.BudgetBench;

// namespace Api.Controllers
// {

//     [ApiController]
//     [Route("api/{controller}")]
//     public class ServicesBudgetsController : ControllerBase
//     {
//         private readonly IServiceBudgetServices _SERVICEBUDGET_SERVICES;
//         public ServicesBudgetsController(IServiceBudgetServices SERVICEBUDGET_SERVICES)
//         {
//             _SERVICEBUDGET_SERVICES = SERVICEBUDGET_SERVICES;
//         }

//         [HttpGet("GetAllServicesBudgetsIncludedAsync")]
//         public async Task<IActionResult> GetAllServicesBudgetsIncludedAsync()
//         {
//             List<ServiceBudgetDto> records = await _SERVICEBUDGET_SERVICES.GetAllAsyncIncluded();
//             return Ok(records);
//         }

//         [HttpGet("GetByIdAsyncIncluded/{id:int:min(1)}")]
//         public async Task<IActionResult> GetByIdAsyncIncluded(int id)
//         {
//             var entitiesFromDb = await _SERVICEBUDGET_SERVICES.GetByIdAsyncIncluded(id);
//             return Ok(entitiesFromDb);
//         }

//         [HttpPost("PostServiceBudget")]
//         public async Task<IActionResult> PostServiceBudget([FromBody] ServiceBudgetDto entityDto)
//         {
//             ServiceBudgetDto entityToDbFromDb = await _SERVICEBUDGET_SERVICES.AddAsync(entityDto);
//             return Ok(entityToDbFromDb);
//         }

//         [HttpPut("UpdateServiceBudget/{id:int:min(1)}")]
//         public async Task<IActionResult> UpdateServiceBudget(int id, [FromBody] ServiceBudgetDto entityDto)
//         {
//             if (id != entityDto.Id) return BadRequest();
//             var record = await _SERVICEBUDGET_SERVICES.Update(entityDto);
//             return Ok(record);
//         }

//         // [HttpGet]
//         // public async Task<IActionResult> GetAllAsync()
//         // {

//         //     List<ServiceBudgetDto> records = await _SERVICEBUDGET_SERVICES.GetAllAsync(false);
//         //     if (records == null) return NotFound();
//         //     return Ok(records);

//         // }


//         // [HttpGet("{id:int:min(1)}")]
//         // public async Task<IActionResult> GetByIdAsync(int id)
//         // {
//         //         var entitiesFromDb = await _SERVICEBUDGET_SERVICES.GetByIdAsyncIncluded(id);
//         //         return Ok(entitiesFromDb);
//         // }


//     }
// }

using System.Threading.Tasks;
using Domain.Entities.ServicesBench;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Data.Operations.ServicesBench;

namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class TableProvidedServicesPricesController : ControllerBase
    {
        private readonly ITableProvidedServicesPricesRepository _iTableProvidedServicesPricesRepository;
        public TableProvidedServicesPricesController(ITableProvidedServicesPricesRepository ITableProvidedServicesPricesRepository)
        {
            _iTableProvidedServicesPricesRepository = ITableProvidedServicesPricesRepository;
        }

        [HttpPost("AddServicesPrices")]
        public string AddServicesPrices([FromBody] TableProvidedServicePrice entity)
        {
            _iTableProvidedServicesPricesRepository.AddAsync(entity);
            if(_iTableProvidedServicesPricesRepository.save()){
                return "Deu bom";
            }

                return "Deu ruim";
        }
    }


}
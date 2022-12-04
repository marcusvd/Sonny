using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Dto.Outsourced;
using Services.Services.Contracts.Outsourced;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class EletronicsRepairsController : ControllerBase
    {
        public EletronicsRepairsController(IEletronicRepairServices ELETRONIC_REPAIR_SERVICES)
        {
            _ELETRONIC_REPAIR_SERVICES = ELETRONIC_REPAIR_SERVICES;

        }
        private readonly IEletronicRepairServices _ELETRONIC_REPAIR_SERVICES;

        [HttpPost]
        public async Task<IActionResult> Post(EletronicRepairDto entityDto)
        {
          
                if (entityDto == null) return NoContent();

                EletronicRepairDto entityFromDb = await _ELETRONIC_REPAIR_SERVICES.AddAsync(entityDto);

                return Ok(entityFromDb);
         
        }
    }
}
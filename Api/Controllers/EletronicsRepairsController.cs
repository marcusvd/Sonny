using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Dto;
using Application.Dto.Outsourced;
using Application.Services.Operations.Outsourced;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class EletronicsRepairsController : ControllerBase
    {
        public EletronicsRepairsController(IElectronicRepairServices ELETRONIC_REPAIR_SERVICES)
        {
            _ELETRONIC_REPAIR_SERVICES = ELETRONIC_REPAIR_SERVICES;
        }
        private readonly IElectronicRepairServices _ELETRONIC_REPAIR_SERVICES;

        [HttpPost("PostEletronicRepair")]
        public async Task<IActionResult> PostEletronicRepair([FromBody] ElectronicRepairDto entityDto)
        {
                ElectronicRepairDto entityFromDb = await _ELETRONIC_REPAIR_SERVICES.AddAsync(entityDto);
                return Ok(entityFromDb);
        }
    }
}
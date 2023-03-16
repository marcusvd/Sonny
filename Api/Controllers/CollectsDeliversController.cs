using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.CollectsDelivers;
using Application.Services.Contracts.Outsourced;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class CollectsDeliversController : ControllerBase
    {
        private readonly ICollectDeliverServices _COLLECTDELLIVER_SERVICES;
        public CollectsDeliversController(ICollectDeliverServices COLLECTDELLIVER_SERVICES)
        {
            _COLLECTDELLIVER_SERVICES = COLLECTDELLIVER_SERVICES;
        }

        [HttpPost("PostCollectDeliver")]
        public async Task<IActionResult> PostCollectDeliver(CollectDeliverDto entityDto)
        {
            CollectDeliverDto entityFromDb = await _COLLECTDELLIVER_SERVICES.AddAsync(entityDto);
            return Ok(entityFromDb);
        }

    }
}
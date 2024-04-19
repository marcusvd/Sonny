using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class CollectsDeliversController : ControllerBase
    {
        private readonly ICollectDeliverServices _COLLECTDELLIVER_SERVICES;
        public CollectsDeliversController(ICollectDeliverServices COLLECTDELLIVER_SERVICES)
        {
            _COLLECTDELLIVER_SERVICES = COLLECTDELLIVER_SERVICES;
        }

        [HttpPost("addcollectdeliver")]
        public async Task<IActionResult> AddCollectDeliver(CollectDeliverDto entityDto)
        {
            var entityFromDb = await _COLLECTDELLIVER_SERVICES.AddAsync(entityDto);
            return Ok(entityFromDb);
        }

    }
}
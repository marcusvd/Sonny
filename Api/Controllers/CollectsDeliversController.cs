using System.Linq;
using System.IO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Dto.CollectsDelivers;
using Services.Services.Contracts;
using Pagination;

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

        [HttpPost]
        public async Task<IActionResult> Post(CollectDeliverDto entityDto)
        {
            if (entityDto == null) return NoContent();

            CollectDeliverDto entityFromDb = await _COLLECTDELLIVER_SERVICES.AddAsync(entityDto);

          //  if (entityFromDb == null) return NoContent();

            return Ok(entityFromDb);

        }

    }
}
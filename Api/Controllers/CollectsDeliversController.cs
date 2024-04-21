using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;
using Pagination.Models;
using System.Collections.Generic;

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

        [HttpGet("GetAllCollectDeliverPagedAsync")]
        public async Task<IActionResult> GetAllCollectDeliverPagedAsync([FromQuery] Params Params)
        {
            PagedList<CollectDeliverDto> returnFromDb = await _COLLECTDELLIVER_SERVICES.GetAllPagedAsync(Params);

            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }


        [HttpGet("GetAllByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllByIdCompanyAsync(int id)
        {
            List<CollectDeliverDto> EntityFromDb = await _COLLECTDELLIVER_SERVICES.GetAllByCompanyIdAsync(id);
            return Ok(EntityFromDb);
        }

    }
}
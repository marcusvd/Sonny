using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;
using Pagination.Models;
using System.Collections.Generic;
using Domain.Entities.Outsourced;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _OS_CollectsDeliversController : ControllerBase
    {
        private readonly ICollectDeliverServices _COLLECTDELLIVER_SERVICES;
        public _OS_CollectsDeliversController(ICollectDeliverServices COLLECTDELLIVER_SERVICES)
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


        [HttpGet("GetAllByCompanyIdCollectDeliverAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllByCompanyIdCollectDeliverAsync(int id)
        {
            List<CollectDeliverDto> EntityFromDb = await _COLLECTDELLIVER_SERVICES.GetAllByCompanyIdAsync(id);
            return Ok(EntityFromDb);
        }

        [HttpGet("GetByIdAllIncluded/{collectDeliverId:min(1)}")]
        public async Task<IActionResult> GetByIdAllIncluded(int collectDeliverId)
        {
            var returnFromDb = await _COLLECTDELLIVER_SERVICES.GetByIdAllIncluded(collectDeliverId);

            return Ok(returnFromDb);
        }

        [HttpPut("UpdateCollectDeliver/{collectDeliverId:min(1)}")]
        public async Task<IActionResult> UpdateCollectDeliver(int collectDeliverId, [FromBody] CollectDeliverUpdateDto entityDto)
        {
            var statusCode = await _COLLECTDELLIVER_SERVICES.UpdateAsync(collectDeliverId, entityDto);
            return Ok(statusCode);
        }

        [HttpPut("DeleteFake/{collectDeliverId:min(1)}")]
        public async Task<IActionResult> DeleteFake(int collectDeliverId)
        {
            var statusCode = await _COLLECTDELLIVER_SERVICES.DeleteFakeAsync(collectDeliverId);
            return Ok(statusCode);
        }


    }
}
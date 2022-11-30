using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pagination;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class InventoriesController : ControllerBase
    {
        private readonly IMapper _MAP;
        private readonly IInventoryServices _INVENTORY_SERVICES;
        public InventoriesController(
            IMapper MAP,
            IInventoryServices INVENTORY_SERVICES
        )
        {
            _MAP = MAP;
            _INVENTORY_SERVICES = INVENTORY_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(InventoryDto entityDto)
        {

            if (entityDto == null) return NotFound();

            InventoryDto entityToDb = await _INVENTORY_SERVICES.AddAsync(entityDto);

            if (entityToDb == null) return NoContent();

            return Ok(entityToDb);

        }

        [HttpGet]
        public async Task<IActionResult> GetAllInventoriesAsync()
        {
            InventoryDto[] entityFromDb = await _INVENTORY_SERVICES.GetAllAsync();

            if (entityFromDb == null) return NotFound();

            return Ok(entityFromDb);
        }


    }
}
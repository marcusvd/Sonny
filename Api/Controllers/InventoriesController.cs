using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Application.Dto;
using Application.Services.Contracts;

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
            IInventoryServices INVENTORY_SERVICES)
        {
            _MAP = MAP;
            _INVENTORY_SERVICES = INVENTORY_SERVICES;
        }

        [HttpPost("PostInventory")]
        public async Task<IActionResult> PostInventory(InventoryDto entityDto)
        {
            InventoryDto entityToDb = await _INVENTORY_SERVICES.AddAsync(entityDto);
            return Ok(entityToDb);
        }

        [HttpGet("GetAllInventoriesAsync")]
        public async Task<IActionResult> GetAllInventoriesAsync()
        {
            InventoryDto[] entityFromDb = await _INVENTORY_SERVICES.GetAllAsync();
            return Ok(entityFromDb);
        }


    }
}
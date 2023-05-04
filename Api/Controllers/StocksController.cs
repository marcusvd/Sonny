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
        private readonly IStockServices _STOCK_SERVICES;
        public InventoriesController(
            IMapper MAP,
            IStockServices STOCK_SERVICES)
        {
            _MAP = MAP;
            _STOCK_SERVICES = STOCK_SERVICES;
        }

        [HttpPost("PostInventory")]
        public async Task<IActionResult> PostInventory(StockDto entityDto)
        {
            StockDto entityToDb = await _STOCK_SERVICES.AddAsync(entityDto);
            return Ok(entityToDb);
        }

        [HttpGet("GetAllInventoriesAsync")]
        public async Task<IActionResult> GetAllInventoriesAsync()
        {
            StockDto[] entityFromDb = await _STOCK_SERVICES.GetAllAsync();
            return Ok(entityFromDb);
        }


    }
}
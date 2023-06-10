using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Application.Dto;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Stocks;
using Services.Dto;
using Pagination.Models;

namespace Api.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/{controller}")]
    public class StocksController : ControllerBase
    {
        private readonly IMapper _MAP;
        private readonly IStockServices _STOCK_SERVICES;
        public StocksController(
            IMapper MAP,
            IStockServices STOCK_SERVICES)
        {
            _MAP = MAP;
            _STOCK_SERVICES = STOCK_SERVICES;
        }

        [HttpPost("AddItemStock")]
        public async Task<IActionResult> AddItemStock(StockDto entityDto)
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

        [HttpGet("GetAllPagedStocksAsync")]
        public async Task<IActionResult> GetAllPagedStocksAsync([FromQuery] Params Params)
        {
            
            PagedListDto<StockDto> returnFromDb = await _STOCK_SERVICES.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);


        }

        [HttpGet("LengthStocksAsync/{id}")]
        public async Task<IActionResult> LengthAsync(int id)
        {
            var totalCount = await _STOCK_SERVICES.GetCountByCompanyIdAsync(id);
            return Ok(totalCount);
        }

    }
}
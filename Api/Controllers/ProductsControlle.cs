using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Data.Operations.Stock;
using System.Linq;
using Application.Services.Operations.Stocks;
using Application.Dto.Stocks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class ProductsController : ControllerBase
    {
        public readonly IProductsAddServices _PRODUCTS_SERVICES;
        public readonly IProductsUpdateServices _PRODUCTS_UPDATE_SERVICES;

        public ProductsController(
            IProductsAddServices PRODUCTS_SERVICES,
            IProductsUpdateServices PRODUCTS_UPDATE_SERVICES
        )
        {
            _PRODUCTS_SERVICES = PRODUCTS_SERVICES;
            _PRODUCTS_UPDATE_SERVICES = PRODUCTS_UPDATE_SERVICES;
        }

        [HttpPost("AddProductAsync")]
        public async Task<IActionResult> AddProductAsync([FromBody] ProductDto entityDto)
        {
            var toDbAdd = await _PRODUCTS_SERVICES.AddAsync(entityDto);
            return Ok(toDbAdd);
        }

        [HttpPut("UpdateProd/{productId:min(0)}")]
        public async Task<IActionResult> UpdateProd(int productId, [FromBody] ProductDto entityDto)
        {
            var toDbUpdate = await _PRODUCTS_UPDATE_SERVICES.UpdateAsync(productId,entityDto);
            return Ok(toDbUpdate);
        }


        // [HttpGet("GetAllProducts/{id:min(0)}")]
        // public async Task<IActionResult> GetAllProducts(int id)
        // {
        //     var products = await _context.GetAllByStockIdAllIncluded(id);
        //     return Ok(products);
        // }

        // [HttpGet("GetByStockIdAllIncluded/{stockId:min(0)}/{productId:min(0)}")]
        // public async Task<IActionResult> GetByStockIdAllIncluded(int stockId, int productId)
        // {
        //     var product = await _context.GetByStockIdAllIncluded(stockId, productId);

        //     return Ok(product);
        // }

        // [HttpGet("GetByStockId/{stockId:min(0)}/{productId:min(0)}")]
        // public async Task<IActionResult> GetByStockId(int stockId, int productId)
        // {
        //     var product = await _context.GetProductByIdByStockIdAsync(x => x.StockId == stockId, y => y.Id == productId);

        //     return Ok(product);
        // }


    }
}
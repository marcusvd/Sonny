using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.ProductServices;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class ProductsController : ControllerBase
    {
        public readonly IProductsAddServices _iProductsAddServices;
        public readonly IProductsGetServices _iProductsGetServices;
        public readonly IProductsUpdateServices _iProductsUpdateServices;

        public ProductsController(
          IProductsAddServices IProductsAddServices,
          IProductsGetServices IProductsGetServices,
          IProductsUpdateServices IProductsUpdateServices
        )
        {
            _iProductsAddServices = IProductsAddServices;
            _iProductsGetServices = IProductsGetServices;
            _iProductsUpdateServices = IProductsUpdateServices;
        }

        [HttpPost("AddProductAsync")]
        public async Task<IActionResult> AddProductAsync([FromBody] ProductDto entityDto)
        {
            var toDbAdd = await _iProductsAddServices.AddAsync(entityDto);
            return Ok(toDbAdd);
        }

        [HttpGet("GetAllPagedAsync")]
        public async Task<IActionResult> GetAllPagedAsync([FromQuery] Params Params)
        {
            PagedList<ProductDto> returnFromDb = await _iProductsGetServices.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        // [HttpPut("UpdateProd/{productId:min(0)}")]
        // public async Task<IActionResult> UpdateProd(int productId, [FromBody] ProductDto entityDto)
        // {
        //     var toDbUpdate = await _iProductsUpdateServices.UpdateAsync(productId, entityDto);
        //     return Ok(toDbUpdate);
        // }

        // [HttpGet("GetAllProductGroupedToDtoView/{stockId}")]
        // public async Task<IActionResult> GetAllProductGroupedToDtoView(int stockId)
        // {
        //     var toDbUpdate = await _iProductsGetServices.GetAllProductGroupedToDtoView(stockId);
        //     return Ok(toDbUpdate);
        // }

    }
}
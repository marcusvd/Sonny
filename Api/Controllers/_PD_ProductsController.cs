using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


using Application.Services.Operations.StockProduct;
using Application.Services.Operations.StockProduct.ProductKind;
using System.Collections.Generic;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _PD_ProductsController : ControllerBase
    {
        public readonly IProductServices _IProductServices;
        public _PD_ProductsController(
          IProductServices IProductServices
        )
        {
            _IProductServices = IProductServices;
        }

        [HttpPost("AddProductTypeAsync")]
        public async Task<IActionResult> AddProductTypeAsync([FromBody] ProductTypeDto entityDto)
        {
            var resultToView = await _IProductServices.AddProductTypeAsync(entityDto);
            return Ok(resultToView);
        }

        [HttpGet("GetProductTypesByIdIncludedAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetProductTypesByIdIncludedAsync(int companyId)
        {
            var resultToView = await _IProductServices.GetProductTypesByIdIncludedAsync(companyId);
            return Ok(resultToView);
        }
        [HttpGet("GetProductTypesIncludedAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetProductTypesIncludedAsync(int companyId)
        {
            var resultToView = await _IProductServices.GetProductTypesIncludedAsync(companyId);
            return Ok(resultToView);
        }

        [HttpGet("GetProductTypesAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetProductTypes(int companyId)
        {
            var resultToView = await _IProductServices.GetProductTypesAsync(companyId);
            return Ok(resultToView);
        }

        [HttpPut("UpdateProductTypeAsync/{id:min(1)}")]
        public async Task<IActionResult> UpdateProductTypeAsync([FromBody] ProductTypeDto entityDto, int id)
        {
            var resultToView = await _IProductServices.UpdateProductTypeAsync(entityDto, id);
            return Ok(resultToView);
        }

        [HttpPut("UpdateProductTypeRangeAsync")]
        public async Task<IActionResult> UpdateProductTypeRangeAsync([FromBody] List<ProductTypeDto> entityDto)
        {
            var resultToView = await _IProductServices.UpdateProductTypeRangeAsync(entityDto);
            return Ok(resultToView);
        }

        //Product
        [HttpPost("AddProductAsync")]
        public async Task<IActionResult> AddProductAsync([FromBody] ProductDto entityDto)
        {
            var resultToView = await _IProductServices.AddProductAsync(entityDto);
            return Ok(resultToView);
        }

        [HttpGet("GetProductsIncludedAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetProductsIncludedAsync(int companyId)
        {
            var resultToView = await _IProductServices.GetProductsIncludedAsync(companyId);
            return Ok(resultToView);
        }
    }
}
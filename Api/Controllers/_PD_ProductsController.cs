using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


using Application.Services.Operations.StockProduct;
using Application.Services.Operations.StockProduct.ProductKind;

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

        [HttpGet("GetProductTypesIncludedAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetProductTypesIncludedAsync(int companyId)
        {
            var resultToView = await _IProductServices.GetProductTypesIncludedAsync(companyId);
            return Ok(resultToView);
        }

        [HttpPut("UpdateProductTypeAsync/{id:min(1)}")]
        public async Task<IActionResult> UpdateProductTypeAsync([FromBody] ProductTypeDto entityDto, int id)
        {
            var resultToView = await _IProductServices.UpdateProductTypeAsync(entityDto, id);
            return Ok(resultToView);
        }

        [HttpGet("GetProductTypesAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetProductTypes(int companyId)
        {
            var resultToView = await _IProductServices.GetProductTypesAsync(companyId);
            return Ok(resultToView);
        }
        [HttpGet("GetSegmentsAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetSegmentsAsync(int companyId)
        {
            var resultToView = await _IProductServices.GetSegmentsAsync(companyId);
            return Ok(resultToView);
        }

        [HttpGet("GetManufacturersAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetManufacturersAsync(int companyId)
        {
            var resultToView = await _IProductServices.GetManufacturersAsync(companyId);
            return Ok(resultToView);
        }


        [HttpGet("GetModelsAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetModels(int companyId)
        {
            var resultToView = await _IProductServices.GetModelsAsync(companyId);
            return Ok(resultToView);
        }










        // [HttpPut("UpdatePartialProduct/{id:min(0)}")]
        // public async Task<IActionResult> UpdatePartialProduct([FromBody] ProductDto entityDto, int productId)
        // {
        //     var toDbAdd = await _IProductServices.UpdatePartial(entityDto, productId);
        //     return Ok(toDbAdd);

        // }

        // [HttpPost("AddStock")]
        // public async Task<IActionResult> AddStock([FromBody] ProductDto entityDto)
        // {
        //     var toDbAdd = await _IProductServices.AddStock(entityDto);
        //     return Ok(toDbAdd);

        // }


        // [HttpGet("GetAllStockByCompanyIdAsync/{companyId:min(1)}")]
        // public async Task<IActionResult> GetAllStockByCompanyIdAsync(int companyId)
        // {
        //     var fromDb = await _IProductServices.GetAllStockByCompanyIdAsync(companyId);
        //     return Ok(fromDb);
        // }


    }
}
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
    public class _PD_ProductChildrenController : ControllerBase
    {
        public readonly IProductChildrenServices _IProductChildrenServices;
        public _PD_ProductChildrenController(IProductChildrenServices IProductChildrenServices)
        {
            _IProductChildrenServices = IProductChildrenServices;
        }

        [HttpGet("GetSegmentsAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetSegmentsAsync(int companyId)
        {
            var resultToView = await _IProductChildrenServices.GetSegmentsAsync(companyId);
            return Ok(resultToView);
        }

        [HttpGet("GetManufacturersAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetManufacturersAsync(int companyId)
        {
            var resultToView = await _IProductChildrenServices.GetManufacturersAsync(companyId);
            return Ok(resultToView);
        }

        [HttpGet("GetModelsAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetModelsAsync(int companyId)
        {
            var resultToView = await _IProductChildrenServices.GetModelsAsync(companyId);
            return Ok(resultToView);
        }

        [HttpGet("GetSpecificitiesAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetSpecificitiesAsync(int companyId)
        {
            var resultToView = await _IProductChildrenServices.GetSpecificitiesAsync(companyId);
            return Ok(resultToView);
        }


        // [HttpPut("UpdateSegmentRangeAsync")]
        // public async Task<IActionResult> UpdateSegmentRangeAsync([FromBody] List<SegmentDto> entityDto)
        // {
        //     var resultToView = await _IProductChildrenServices.UpdateSegmentRangeAsync(entityDto);
        //     return Ok(resultToView);
        // }

        // [HttpPut("UpdateManufacturerRangeAsync")]
        // public async Task<IActionResult> UpdateManufacturerRangeAsync([FromBody] List<ManufacturerDto> entityDto)
        // {
        //     var resultToView = await _IProductChildrenServices.UpdateManufacturerRangeAsync(entityDto);
        //     return Ok(resultToView);
        // }

        // [HttpPut("UpdateModelRangeAsync")]
        // public async Task<IActionResult> UpdateModelRangeAsync([FromBody] List<ModelDto> entityDto)
        // {
        //     var resultToView = await _IProductChildrenServices.UpdateModelRangeAsync(entityDto);
        //     return Ok(resultToView);
        // }
       
        
    }
}
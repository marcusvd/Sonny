using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.ProductServices;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;
using System.Collections.Generic;

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
        public readonly IProductsTrackingGetServices _iProductsTrackingGetServices;

        public ProductsController(
          IProductsAddServices IProductsAddServices,
          IProductsGetServices IProductsGetServices,
          IProductsUpdateServices IProductsUpdateServices,
          IProductsTrackingGetServices IProductsTrackingGetServices
        )
        {
            _iProductsAddServices = IProductsAddServices;
            _iProductsGetServices = IProductsGetServices;
            _iProductsUpdateServices = IProductsUpdateServices;
            _iProductsTrackingGetServices = IProductsTrackingGetServices;
        }

        [HttpPost("AddProductAsync")]
        public async Task<IActionResult> AddProductAsync([FromBody] ProductDto entityDto)
        {
            var toDbAdd = await _iProductsAddServices.AddAsync(entityDto);
            return Ok(toDbAdd);
        }

        [HttpPost("AddProductSoldTrakingAsync")]
        public async Task<IActionResult> AddProductSoldTrakingAsync([FromBody] List<TrackingDto> entitiesDto)
        {
            var toDbAdd = await _iProductsAddServices.AddProductSoldTrakingAsync(entitiesDto);
            return Ok(toDbAdd);
        }
        [HttpGet("GetAllProductsPagedAsync")]
        public async Task<IActionResult> GetAllProductsPagedAsync([FromQuery] Params Params)
        {
            Page<ProductDto> returnFromDb = await _iProductsGetServices.GetAllAvailableToSellPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("LengthAsync/{companyId:min(0)}")]
        public async Task<IActionResult> LengthAsync(int companyId)
        {

            var length = await _iProductsGetServices.GetLengthAsync(companyId);
            return Ok(length);

        }

        [HttpGet("GetProductByIdAsync/{productId:min(0)}")]
        public async Task<IActionResult> GetProductByIdAsync(int productId)
        {
            var length = await _iProductsGetServices.GetProductByIdAsync(productId);
            return Ok(length);
        }

        [HttpGet("AutoRemoveReserve/{companyId:min(0)}")]
        public async Task<IActionResult> AutoRemoveReserve(int companyId)
        {

            var resultReturn = await _iProductsUpdateServices.AutoReserveRemove(companyId);

            if (resultReturn)
                return Ok(new KeyValuePair<string, int>("Items reservados a mais de 7 dias, removidos da reserva.", 200));
            else
                return Ok(new KeyValuePair<string, int>("Nenhum item removido da reserva.", 400));

        }

    }
}
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
    public class ProductsTrackingsController : ControllerBase
    {
        public readonly IProductsTrackingGetServices _iProductsTrackingGetServices;

        public ProductsTrackingsController(
          IProductsTrackingGetServices IProductsTrackingGetServices
        )
        {
            _iProductsTrackingGetServices = IProductsTrackingGetServices;

        }

        [HttpGet("GetByIdInServicesAsync")]
        public async Task<IActionResult> GetByIdInServicesAsync([FromQuery] Params Params)
        {

            var returnFromDb = await _iProductsTrackingGetServices.GetByIdInServicesAsync(Params);

            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

    }
}
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.ProductServices;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;
using Application.Services.Operations.ProductServices.QuantitiesServices;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class QuantitiesProductController : ControllerBase
    {
        public readonly IQuantitiesUpdateServices _iQuantitiesUpdateServices;
        public readonly IQuantitiesGetServices _iQuantitiesGetServices;

        public QuantitiesProductController(
          IQuantitiesUpdateServices IQuantitiesUpdateServices,
          IQuantitiesGetServices IQuantitiesGetServices
                )
        {
            _iQuantitiesUpdateServices = IQuantitiesUpdateServices;
            _iQuantitiesGetServices = IQuantitiesGetServices;
        }

        [HttpPut("ToReserveUpdateAsync/{quantityId}")]
        public async Task<IActionResult> ToReserveUpdateAsync(int quantityId, [FromBody] QuantityDto entityDto)
        {
            var toDbAdd = await _iQuantitiesUpdateServices.ToReserve(quantityId, entityDto);
            return Ok(toDbAdd);
        }

        [HttpGet("GetByIdAsync/{quantityId}")]
        public async Task<IActionResult> GetByIdAsync(int quantityId)
        {
            var returnFromDb = await _iQuantitiesUpdateServices.GetByIdAsync(quantityId);
            return Ok(returnFromDb);
        }

        [HttpGet("GetAllQuantitiesByProductIdAsync")]
        public async Task<IActionResult> GetAllQuantitiesByProductIdAsync([FromQuery] Params Params)
        {
            Page<QuantityDto> returnFromDb = await _iQuantitiesGetServices.GetAllQuantitiesByProductId(Params);
            Response.AddPagination(returnFromDb.CurrentPg,
                        returnFromDb.TotalPgs,
                        returnFromDb.PgSize,
                        returnFromDb.TotalCount,
                        returnFromDb.HasPrevious,
                        returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
      

        }


        // [HttpGet("GetAllProductsPagedAsync")]
        // public async Task<IActionResult> GetAllProductsPagedAsync([FromQuery] Params Params)
        // {
        //     Page<ProductDto> returnFromDb = await _iProductsGetServices.GetAllAvailableToSellPagedAsync(Params);
        //     if (returnFromDb == null) return null;

        //     Response.AddPagination(returnFromDb.CurrentPg,
        //                            returnFromDb.TotalPgs,
        //                            returnFromDb.PgSize,
        //                            returnFromDb.TotalCount,
        //                            returnFromDb.HasPrevious,
        //                            returnFromDb.HasNext);
        //     return Ok(returnFromDb.EntitiesToShow);
        // }




    }
}
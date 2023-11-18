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

        public QuantitiesProductController(
          IQuantitiesUpdateServices IQuantitiesUpdateServices
                )
        {
            _iQuantitiesUpdateServices = IQuantitiesUpdateServices;
        }

        [HttpPut("ToReserveUpdateAsync/{quantityId}")]
        public async Task<IActionResult> ToReserveUpdateAsync(int quantityId, [FromBody] QuantityDto entityDto)
        {
            var toDbAdd = await _iQuantitiesUpdateServices.ToReserve(quantityId,entityDto);
            return Ok(toDbAdd);
        }
        
        [HttpGet("GetByIdAsync/{quantityId}")]
        public async Task<IActionResult> GetByIdAsync(int quantityId)
        {
            var returnFromDb = await _iQuantitiesUpdateServices.GetByIdAsync(quantityId);
            return Ok(returnFromDb);
        }


    }
}
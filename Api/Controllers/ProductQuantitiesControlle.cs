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
    public class ProductQuantitiesControlle : ControllerBase
    {
        public readonly IQuantitiesUpdateServices _iQuantitiesUpdateServices;

        public ProductQuantitiesControlle(
          IQuantitiesUpdateServices IQuantitiesUpdateServices
                )
        {
            _iQuantitiesUpdateServices = IQuantitiesUpdateServices;
        }

        [HttpPut("UpdateQuantities/{quantityId}")]
        public async Task<IActionResult> UpdateQuantities(int quantityId, [FromBody] QuantityDto entityDto)
        {
            var toDbAdd = await _iQuantitiesUpdateServices.Reserve(quantityId,entityDto);
            return Ok(toDbAdd);
        }


    }
}
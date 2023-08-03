using System.Threading.Tasks;
using Application.Services.Operations.Products;
using Application.Services.Operations.Products.Dtos;
using Domain.Entities.Stocks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Data.Operations.Products;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class ManufacturersController : ControllerBase
    {
       private readonly IManufacturerAddServices _iManufacturerAddServices;

        public ManufacturersController(IManufacturerAddServices IManufacturerAddServices)
        {
            _iManufacturerAddServices = IManufacturerAddServices;

        }

        [HttpPost("AddManufacturer")]
        public async Task<ManufacturerDto> AddManufacturer([FromBody] ManufacturerDto entityDto)
        {
          var fromDb = await _iManufacturerAddServices.AddAsync(entityDto);
        
            return fromDb;
        }

    }
}
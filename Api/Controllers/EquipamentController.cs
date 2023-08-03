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
    public class EquipamentController : ControllerBase
    {
        private readonly IEquipamentAddServices _iEquipamentAddServices;

        public EquipamentController(IEquipamentAddServices IEquipamentAddServices)
        {
            _iEquipamentAddServices = IEquipamentAddServices;

        }

        [HttpPost("AddEquipament")]
        public async Task<EquipamentTypeDto> AddEquipament([FromBody] EquipamentTypeDto entityDto)
        {
          var fromDb = await _iEquipamentAddServices.AddAsync(entityDto);
        
            return fromDb;
        }



    }
}
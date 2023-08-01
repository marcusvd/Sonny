using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Data.Operations.Stock;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class EquipamentController : ControllerBase
    {
        private readonly IEquipamentRepository _iEquipamentRepository;

        public EquipamentController(IEquipamentRepository IEquipamentRepository)
        {
            _iEquipamentRepository = IEquipamentRepository;

        }

        [HttpPost("AddEquipament")]
        public async Task<string> AddEquipament([FromBody] EquipamentType entityDto)
        {


            _iEquipamentRepository.AddAsync(entityDto);

            if (await _iEquipamentRepository.save())
            {
                return "Zé, this was added.";
            }

            return "Zé, Nothing good.";
        }



    }
}
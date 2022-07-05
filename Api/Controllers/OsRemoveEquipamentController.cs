using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class OsRemoveEquipamentController : ControllerBase
    {
        private readonly IOsRemoveEquipamentServices _IOSREMOVEEQUIPAMENT_SERVICES;
        public OsRemoveEquipamentController(
                                IOsRemoveEquipamentServices IOSREMOVEEQUIPAMENT_SERVICES
            )
        {
            _IOSREMOVEEQUIPAMENT_SERVICES = IOSREMOVEEQUIPAMENT_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(OsRemoveEquipamentDto model)
        {

            try
            {
                if (model == null) return NotFound();

                OsRemoveEquipamentDto ret = await _IOSREMOVEEQUIPAMENT_SERVICES.AddAsync(model);

                return Ok(ret);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
            
        }

    }





}
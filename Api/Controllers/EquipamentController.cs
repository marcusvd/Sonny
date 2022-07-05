using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;



namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class ItemsController : ControllerBase
    {
       private readonly IEquipamentServices _EQUIPAMENT_SERVICES;
        public ItemsController(
            IEquipamentServices EQUIPAMENT_SERVICES
            )
        {
            _EQUIPAMENT_SERVICES = EQUIPAMENT_SERVICES;

        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                EquipamentDto[] equipamentDto = await _EQUIPAMENT_SERVICES.GetAllAsync();
                if (equipamentDto == null) return NotFound();
                return Ok(equipamentDto);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }
        [HttpGet("{ids}")]
        public async Task<IActionResult> Getl(int id)
        {
            try
            {
                EquipamentDto ItemDto = await _EQUIPAMENT_SERVICES.GetByIdAsync(id);
                // if (ItemDto != null)
                // {
                //     ids.ToList().ForEach(_ids =>
                //     {
                //         ItemDto.ToList().;
                //     })

                // }




                if (ItemDto == null) return NotFound();
                return Ok(ItemDto);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }


    [HttpPost]
        public async Task<IActionResult> Post(EquipamentDto entity)
        {
            try
            {
                EquipamentDto Record = await _EQUIPAMENT_SERVICES.AddAsync(entity);

                if (Record == null) return NoContent();
                //dedicated to search field
            

                return Ok(Record);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
    }
}
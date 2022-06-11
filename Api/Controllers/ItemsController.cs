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
       private readonly IItemServices _ITEM_SERVICES;
        public ItemsController(
            IItemServices ITEM_SERVICES
            )
        {
            _ITEM_SERVICES = ITEM_SERVICES;

        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                ItemDto[] _ItemDto = await _ITEM_SERVICES.GetAllAsync();
                if (_ItemDto == null) return NotFound();
                return Ok(_ItemDto);
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
                ItemDto ItemDto = await _ITEM_SERVICES.GetByIdAsync(id);
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
        public async Task<IActionResult> Post(ItemDto entity)
        {
            try
            {
                ItemDto Record = await _ITEM_SERVICES.AddAsync(entity);

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
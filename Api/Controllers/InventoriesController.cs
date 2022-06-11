using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class InventoriesController : ControllerBase
    {

        private readonly IMapper _MAP;
        private readonly IInventoryServices _INVENTORY_SERVICES;
        public InventoriesController(
            IMapper MAP,
            IInventoryServices INVENTORY_SERVICES
        )
        {
            _MAP = MAP;
            _INVENTORY_SERVICES = INVENTORY_SERVICES;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInventoriesAsync()
        {
            try
            {
                InventoryDto[] Inventories = await _INVENTORY_SERVICES.GetAllAsync();
                if (Inventories == null) return NotFound();
                return Ok(Inventories);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. {ex.Message}");
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetByIdAsync(int Id)
        {
            try
            {
                InventoryDto Inventories = await _INVENTORY_SERVICES.GetByIdAsync(Id);
                if (Inventories == null) return NotFound();
                return Ok(Inventories);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou. {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(InventoryDto entity)
        {

            try
            {
                if (entity == null) return NotFound();
                InventoryDto record = await _INVENTORY_SERVICES.AddAsync(entity);

                if (record == null) return NoContent();

                return Ok(record);


            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int Id, InventoryDto entity)
        {
            try
            {
                if (Id != entity.Id) return NotFound();

                InventoryDto record = await _INVENTORY_SERVICES.EditAsync(Id, entity);

                if (record == null) return NoContent();

                return Ok(record);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }






    }
}
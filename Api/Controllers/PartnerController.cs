using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class PartnerController : ControllerBase
    {
        private readonly IPartnerServices _PARTNER_SERVICES;
        private readonly IMapper _MAP;
        public PartnerController(
            IPartnerServices PARTNER_SERVICES,
            IMapper MAP
            )
        {
            _PARTNER_SERVICES = PARTNER_SERVICES;
            _MAP = MAP;
        }

        [HttpPost]
        public async Task<IActionResult> Post(PartnerDto entityDto)
        {

            PartnerDto entityToDb = await _PARTNER_SERVICES.AddAsync(entityDto);

            if (entityToDb == null) return NoContent();

            return Ok(entityToDb);

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            PartnerDto[] entityFromoDb = await _PARTNER_SERVICES.GetAllAsync();

            if (entityFromoDb == null) return NotFound();

            return Ok(entityFromoDb);

        }







        // [HttpPut("{Id}")]
        // public async Task<IActionResult> Put(int Id, PartnerDto partnerDto)
        // {
        //     try
        //     {
        //         PartnerDto partner = await _PARTNER_SERVICES.GetByIdAsync(Id);

        //         if (partner == null) return NoContent();

        //         return Ok(await _PARTNER_SERVICES.EditAsync(Id, partnerDto));

        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
        //     }
        // }


        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetById(int Id)
        // {
        //     try
        //     {
        //         PartnerDto partner = await _PARTNER_SERVICES.GetByIdAsync(Id);
        //         if (partner == null) return NotFound();

        //         return Ok(partner);
        //     }
        //     catch (System.Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
        //     }


        // }

        // [HttpDelete("{Id}")]
        // public async Task<IActionResult> remove(int Id)
        // {
        //     try
        //     {
        //         PartnerDto partner = await _PARTNER_SERVICES.GetByIdAsync(Id);

        //         if (partner == null) return NotFound();

        //         if (await _PARTNER_SERVICES.DeleteAsync(Id))
        //         {
        //             Ok(new { message = "Deletado!" });
        //         }
        //         else
        //         {
        //             throw new Exception("Erro desconhecido.");
        //         }
        //         return Ok();

        //     }
        //     catch (System.Exception ex)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
        //     }
        // }


    }
}
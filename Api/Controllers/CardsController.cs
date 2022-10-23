using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Dto.Financial;
using Services.Services.Contracts;
using Services.Services.Contracts.Financial;

namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class CardsController: ControllerBase
    {
        private readonly ICardServices _CARD_SERVICES;
        public CardsController(ICardServices CARD_SERVICES)
        {
            _CARD_SERVICES = CARD_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CardDto record)
        {
            try
            {
                CardDto returnToView = await _CARD_SERVICES.AddAsync(record);
                if(returnToView == null)  return NoContent();

                return Ok(returnToView);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                CardDto[] _cardDto = await _CARD_SERVICES.GetAllAsync();
                if (_cardDto == null) return NotFound();
                return Ok(_cardDto);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }
    }
}

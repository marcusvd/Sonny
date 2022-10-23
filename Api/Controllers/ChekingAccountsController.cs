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
    public class CheckingAccountsController : ControllerBase
    {
        private readonly ICheckingAccountServices _CHEKING_SERICES;
        
        public CheckingAccountsController(ICheckingAccountServices CHEKING_SERICES)
        {
            _CHEKING_SERICES = CHEKING_SERICES;
        }


        [HttpGet]
      public async Task<IActionResult> GetAll()
        {
            try
            {
                CheckingAccountDto[] _chekingAccountDto = await _CHEKING_SERICES.GetAllAsync();
                if (_chekingAccountDto == null) return NotFound();
                return Ok(_chekingAccountDto);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(CheckingAccountDto record)
        {
            try
            {
                CheckingAccountDto toRecord = await _CHEKING_SERICES.AddAsync(record);
                if (_CHEKING_SERICES == null) return NoContent();
                return Ok(toRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"`Erro: {ex.Message}`");
            }
        }




    }
}
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Dto.Financial;
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

        [HttpPost]
        public async Task<IActionResult> Post(CheckingAccountDto entityDto)
        {

            CheckingAccountDto EntityToDb = await _CHEKING_SERICES.AddAsync(entityDto);
            if (_CHEKING_SERICES == null) return NoContent();
            return Ok(EntityToDb);

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            CheckingAccountDto[] EntityFromDb = await _CHEKING_SERICES.GetAllAsync();
            if (EntityFromDb == null) return NotFound();
            return Ok(EntityFromDb);

        }
    }
}
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Dto.Financial;
using Services.Services.Contracts.Financial;

namespace Api.Controllers
{ //just give a git
    [ApiController]
    [Route("api/{controller}")]
    public class CheckingAccountsController : ControllerBase
    {
        private readonly ICheckingAccountServices _CHECKING_SERICES;

        public CheckingAccountsController(ICheckingAccountServices CHEKING_SERICES)
        {
            _CHECKING_SERICES = CHEKING_SERICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CheckingAccountDto entityDto)
        {
            CheckingAccountDto EntityToDb = await _CHECKING_SERICES.AddAsync(entityDto);
            if (_CHECKING_SERICES == null) return NoContent();
            return Ok(EntityToDb);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            CheckingAccountDto[] EntityFromDb = await _CHECKING_SERICES.GetAllAsync();
            if (EntityFromDb == null) return NotFound();
            return Ok(EntityFromDb);
        }
    }
}
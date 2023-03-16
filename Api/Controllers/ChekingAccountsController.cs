using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.Financial;
using Application.Services.Contracts.Financial;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class CheckingAccountsController : ControllerBase
    {
        private readonly ICheckingAccountServices _CHECKING_SERICES;

        public CheckingAccountsController(ICheckingAccountServices CHEKING_SERICES)
        {
            _CHECKING_SERICES = CHEKING_SERICES;
        }

        [HttpPost("PostCheckingAccount")]
        public async Task<IActionResult> PostCheckingAccount([FromBody] CheckingAccountDto entityDto)
        {
            CheckingAccountDto EntityToDb = await _CHECKING_SERICES.AddAsync(entityDto);
            if (_CHECKING_SERICES == null) return NoContent();
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllCheckingAccount")]
        public async Task<IActionResult> GetAllCheckingAccount()
        {
            CheckingAccountDto[] EntityFromDb = await _CHECKING_SERICES.GetAllAsync();
            if (EntityFromDb == null) return NotFound();
            return Ok(EntityFromDb);
        }
    }
}
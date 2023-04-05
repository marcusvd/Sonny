using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Contracts.Authentication;


namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountServices _iAccountServices;

        public AccountsController(IAccountServices iAccountServices)
        {
            _iAccountServices = iAccountServices;
        }

        [HttpGet("GetUserByNameAsync/{name}")]
        public async Task<IActionResult> GetUserByNameAsync(string name)
        {
            var result = await _iAccountServices.GetUserByName(name);
            return Ok(result);
        }
        [HttpGet("GetAllUsersAsync")]
        public async Task<IActionResult> GetAllUsersAsync(string name)
        {
            var result = await _iAccountServices.GetAllUsers();
            return Ok(result);
        }
    }
}
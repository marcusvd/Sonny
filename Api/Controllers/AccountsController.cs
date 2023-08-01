using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Contracts.Authentication;
using Application.Dto.Authentication;


namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
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
            var result = await _iAccountServices.GetUserByNameAsync(name);
            return Ok(result);
        }
        [HttpGet("GetUserByNameAllIncludedAsync/{name}")]
        public async Task<IActionResult> GetUserByNameAllIncludedAsync(string name)
        {
            var result = await _iAccountServices.GetUserByNameAllIncludedAsync(name);
            return Ok(result);
        }
        [HttpGet("GetUserByIdAsync/{name}")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            var result = await _iAccountServices.GetUserByIdAsync(id);
            return Ok(result);
        }

        [HttpGet("GetAllUsersAsync")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            var result = await _iAccountServices.GetAllUsersAsync();
            return Ok(result);
        }

        [HttpPut("UpdateUserAsync/{id:int:min(1)}")]
        public async Task<IActionResult> UpdateUserAsync(int id, [FromBody] MyUserDto user)
        {
            var result = await _iAccountServices.UpdateUserAsync(user);
            return Ok(result);
        }

    }
}
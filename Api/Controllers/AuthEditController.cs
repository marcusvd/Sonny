using System;
using System.Threading.Tasks;
using Authentication.Services.Operations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Authentication;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AuthEditController : ControllerBase
    {
        private readonly AccountManagerEditServices _accountManagerEditServices;
        public AuthEditController(AccountManagerEditServices accountManagerEditServices)
        {
            _accountManagerEditServices = accountManagerEditServices;
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetUserByName(string name)
        {
            var myUser = await _accountManagerEditServices.GetUserByName(name);
            return Ok(myUser);
        }




    }
}

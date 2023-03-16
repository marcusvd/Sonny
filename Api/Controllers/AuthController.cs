using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.Authentication;
using Application.Services.Contracts.Authentication;
using Application.Services.Operations.Authentication;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthServices _iAuthServices;

        public AuthController(IAuthServices iAuthServices)
        {
            _iAuthServices = iAuthServices;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(MyUserDto user)
        {
            var result = await _iAuthServices.RegisterUser(user);

            if (!result.Authenticated)
            {
                throw new Exception("Erro na tentativa de criar o usuário.");
            }

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] MyUserDto user)
        {
            var login = await _iAuthServices.Login(user);

            if (login.Authenticated)
            {
                return Ok(login);
            }

            return Unauthorized();
        }

        [HttpGet]
        public ResetPasswordDto Reset(string token, string email)
        {
            ResetPasswordDto result = _iAuthServices.ResetPassword(token, email);
            return result;
        }

        [HttpPost("Reset")]
        public async Task<IActionResult> Reset(ResetPasswordDto resetPassword)
        {
            if (resetPassword == null) throw new Exception("Objeto era nulo");
            return Ok(await _iAuthServices.ResetPassword(resetPassword));
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPassword)
        {
            if (forgotPassword == null) throw new Exception("Objeto era nulo.");

            if (!await _iAuthServices.ForgotPassword(forgotPassword)) throw new Exception("Objeto era nulo."); //BadRequest("Usuário não encontrado");


            return Ok(true);
        }
        [HttpPost("RetryConfirmEmailGenerateNewToken")]
        public async Task<IActionResult> RetryConfirmEmailGenerateNewToken(RetryConfirmPasswordDto retryConfirmPassword)
        {
            if (retryConfirmPassword == null) throw new Exception("Objeto era nulo.");

            if (!await _iAuthServices.RetryConfirmEmailGenerateNewToken(retryConfirmPassword)) throw new Exception("Objeto era nulo."); //BadRequest("Usuário não encontrado");


            return Ok(true);
        }

        [HttpPost("ConfirmEmailAddress")]
        public async Task<IActionResult> ConfirmEmailAddress(ConfirmEmailDto confirmEmail)
        {
            if (confirmEmail == null) throw new Exception("Objeto era nulo.");

            if (!await _iAuthServices.ConfirmEmailAddress(confirmEmail)) throw new Exception("Objeto era nulo."); //BadRequest("Usuário não encontrado");

            return Ok(true);
        }

        [HttpPost("TwoFactor")]
        public async Task<IActionResult> TwoFactor([FromBody] T2FactorDto t2Factor)
        {
            var result = await _iAuthServices.TwoFactor(t2Factor);

            return Ok(result);
        }

        //ROLES
        [HttpPost("CreateRole")]
        public async Task<IActionResult> CreateRole(RoleDto role)
        {
            var result = await _iAuthServices.CreateRole(role);
            return Ok(result);
        }

        [HttpPut("UpdateUserRole")]
        public async Task<IActionResult> UpdateUserRole(UpdateUserRoleDto model)
        {
            var result = await _iAuthServices.UpdateUserRoles(model);
            return Ok(result);
        }





    }
}

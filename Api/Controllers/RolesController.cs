using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Authentication;
using Application.Services.Operations.Authentication.Dtos;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly IAuthServices _iAuthServices;
        public RolesController(IAuthServices iAuthServices)
        {
            _iAuthServices = iAuthServices;
        }

        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

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

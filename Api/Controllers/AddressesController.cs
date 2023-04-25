using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.Authentication;
using Application.Services.Contracts.Authentication;
using Application.Services.Operations.Authentication;
using Application.Services.PersonalData.Contracts;
using Application.Dto.Shared;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AddressesController : ControllerBase
    {
        private readonly IAddressesServices _iAddressesServices;

        public AddressesController(IAddressesServices iAddressesServices)
        {
            _iAddressesServices = iAddressesServices;
        }

        [HttpGet("getAllAsync")]
        public async Task<IActionResult> getAllAsync()
        {
            var result = await _iAddressesServices.GetAllAsync();

            return Ok(result);
        }

        [HttpGet("getByIdAsync/{id:int:min(1)}")]
        public async Task<IActionResult> getByIdAsync(int id)
        {
            return Ok(await _iAddressesServices.GetByIdAsync(id));
        }

        [HttpPut("UpdateAsync/{id:int:min(1)}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] AddressDto model)
        {
            var result = await _iAddressesServices.UpdateAsync(id, model);
            return Ok(result);
        }





    }

}

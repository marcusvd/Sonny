using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Dto.Authentication;
using Application.Services.Contracts.Authentication;
using Application.Services.Operations.Authentication;
using Application.Dto.Shared;
using Application.Services.PersonalData.Contracts;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactsServices _iContactsServices;

        public ContactsController(IContactsServices iContactsServices)
        {
            _iContactsServices = iContactsServices;
        }

        [HttpGet("getAllAsync")]
        public async Task<IActionResult> getAllAsync()
        {
            var result = await _iContactsServices.GetAllAsync();

            return Ok(result);
        }

        [HttpGet("getByIdAsync/{id:int:min(1)}")]
        public async Task<IActionResult> getByIdAsync(int id)
        {
            return Ok(await _iContactsServices.GetByIdAsync(id));
        }
        [HttpGet("GetByIdAllIncludedAsync/{id:int:min(1)}")]
        public async Task<IActionResult> GetByIdAllIncludedAsync(int id)
        {
            return Ok(await _iContactsServices.GetByIdAllIncludedAsync(id));
        }

        [HttpPut("UpdateAsync/{id:int:min(1)}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] ContactDto model)
        {
            var result = await _iContactsServices.UpdateAsync(id, model);
            return Ok(result);
        }





    }

}

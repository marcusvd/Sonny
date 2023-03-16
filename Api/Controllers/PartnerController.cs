using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Application.Dto;
using Application.Services.Contracts;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class PartnerController : ControllerBase
    {
        private readonly IPartnerServices _PARTNER_SERVICES;
        private readonly IMapper _MAP;
        public PartnerController(
            IPartnerServices PARTNER_SERVICES,
            IMapper MAP
            )
        {
            _PARTNER_SERVICES = PARTNER_SERVICES;
            _MAP = MAP;
        }

        [HttpPost("PostPartner")]
        public async Task<IActionResult> PostPartner(PartnerDto entityDto)
        {
            PartnerDto entityToDb = await _PARTNER_SERVICES.AddAsync(entityDto);
            return Ok(entityToDb);
        }

        [HttpGet("GetAllPartnersAsync")]
        public async Task<IActionResult> GetPartner()
        {
            PartnerDto[] entityFromoDb = await _PARTNER_SERVICES.GetAllAsync();
            return Ok(entityFromoDb);
        }
    }
}
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;


namespace Api.Controllers
{
    [ApiController]
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

        [HttpPost]
        public async Task<IActionResult> Post(PartnerDto entityDto)
        {
            PartnerDto entityToDb = await _PARTNER_SERVICES.AddAsync(entityDto);
            return Ok(entityToDb);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            PartnerDto[] entityFromoDb = await _PARTNER_SERVICES.GetAllAsync();
            return Ok(entityFromoDb);
        }
    }
}
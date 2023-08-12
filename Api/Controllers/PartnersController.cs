using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Pagination.Models;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Main.Partners;
using Application.Services.Shared.Dtos.Pagination;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class PartnersController : ControllerBase
    {
        private readonly IPartnerAddServices _PARTNER_SERVICES;
        private readonly IMapper _MAP;
        public PartnersController(
            IPartnerAddServices PARTNER_SERVICES,
            IMapper MAP
            )
        {
            _PARTNER_SERVICES = PARTNER_SERVICES;
            _MAP = MAP;
        }

        [HttpPost("AddPartner")]
        public async Task<IActionResult> AddPartner(PartnerDto entityDto)
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

        [HttpGet("GetAllPartnersByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllPartnersByIdCompanyAsync(int id)
        {
            List<PartnerDto> entityFromDb = await _PARTNER_SERVICES.GetAllByCompanyIdAsync(id);
            return Ok(entityFromDb);
        }
        [HttpGet("GetAllPagedPartnersAsync")]
        public async Task<IActionResult> GetAllPagedPartnersAsync([FromQuery] Params Params)
        {
            PagedListDto<PartnerDto> returnFromDb = await _PARTNER_SERVICES.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);


        }

        [HttpGet("LengthPartnersAsync/{id}")]
        public async Task<IActionResult> LengthAsync(int id)
        {
            var totalCount = await _PARTNER_SERVICES.GetCountByCompanyIdAsync(id);
            return Ok(totalCount);
        }
        [HttpGet("LengthHardwareVendorPartnersAsync/{id}")]
        public async Task<IActionResult> LengthHardwareVendorPartnersAsync(int id)
        {
            var totalCount = await _PARTNER_SERVICES.GetTotalHardwareVendorPartnersByCompanyId(id);
            return Ok(totalCount);
        }
    }
}


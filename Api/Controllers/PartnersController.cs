using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Application.Dto;
using Application.Services.Operations.Partners;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Pagination.Models;
using Services.Dto;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class PartnersController : ControllerBase
    {
        private readonly IPartnerServices _PARTNER_SERVICES;
        private readonly IMapper _MAP;
        public PartnersController(
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
    }
}
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Pagination.Models;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Main.Partners;


namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class PartnersController : ControllerBase
    {
        private readonly IPartnerAddServices _iPartnerAddServices;
        private readonly IPartnerGetServices _iPartnerGetServices;
        private readonly IMapper _MAP;
        public PartnersController(
            IPartnerAddServices IPartnerAddServices,
            IPartnerGetServices IPartnerGetServices,
            IMapper MAP
            )
        {
            _iPartnerAddServices = IPartnerAddServices;
            _iPartnerGetServices = IPartnerGetServices;
            _MAP = MAP;
        }

        [HttpPost("AddPartner")]
        public async Task<IActionResult> AddPartner(PartnerDto entityDto)
        {
            PartnerDto entityToDb = await _iPartnerAddServices.AddAsync(entityDto);
            return Ok(entityToDb);
        }

        [HttpGet("GetAllPartnersAsync")]
        public async Task<IActionResult> GetPartner()
        {
            // PartnerDto[] entityFromoDb = await _iPartnerGetServices.GetAllAsync();
            // return Ok(entityFromoDb);
            return null;
        }

        [HttpGet("GetAllHardwareVendorByCompanyIdAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllHardwareVendorByCompanyIdAsync(int companyId)
        {
            List<PartnerDto> entityFromoDb = await _iPartnerGetServices.GetAllHardwareVendorByCompanyIdAsync(companyId);
            return Ok(entityFromoDb);
        }

        [HttpGet("GetAllPartnersByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllPartnersByIdCompanyAsync(int id)
        {
            List<PartnerDto> entityFromDb = await _iPartnerGetServices.GetAllByCompanyIdAsync(id);
            return Ok(entityFromDb);
        }
        [HttpGet("GetAllEletronicRepairAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllEletronicRepairAsync(int companyId)
        {
            List<PartnerDto> entityFromDb = await _iPartnerGetServices.GetAllEletronicRepairAsync(companyId);
            return Ok(entityFromDb);
        }
        [HttpGet("GetAllPagedPartnersAsync")]
        public async Task<IActionResult> GetAllPagedPartnersAsync([FromQuery] Params Params)
        {
            PagedList<PartnerDto> returnFromDb = await _iPartnerGetServices.GetAllPagedAsync(Params);
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
            var totalCount = await _iPartnerGetServices.GetCountByCompanyIdAsync(id);
            return Ok(totalCount);
        }
        [HttpGet("LengthHardwareVendorPartnersAsync/{id}")]
        public async Task<IActionResult> LengthHardwareVendorPartnersAsync(int id)
        {
            var totalCount = await _iPartnerGetServices.GetTotalHardwareVendorByCompanyIdAsync(id);
            return Ok(totalCount);
        }
    }
}
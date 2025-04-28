using System.Threading.Tasks;
// using AutoMapper;
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
        private readonly IPartnerUpdateServices _iPartnerUpdateServices;
        public PartnersController(
            IPartnerAddServices IPartnerAddServices,
            IPartnerGetServices IPartnerGetServices,
            IPartnerUpdateServices IPartnerUpdateServices
            )
        {
            _iPartnerAddServices = IPartnerAddServices;
            _iPartnerGetServices = IPartnerGetServices;
            _iPartnerUpdateServices = IPartnerUpdateServices;
        }

        [HttpPost("AddPartner")]
        public async Task<IActionResult> AddPartner(PartnerDto entityDto)
        {
            PartnerDto entityToDb = await _iPartnerAddServices.AddAsync(entityDto);
            return Ok(entityToDb);
        }

        [HttpGet("GetPartnerByIdAllIncluded/{partnerId:min(1)}")]
        public async Task<IActionResult> GetPartnerByIdAllIncluded(int partnerId)
        {
            var returnFromDb = await _iPartnerGetServices.GetByIdAllIncluded(partnerId);

            return Ok(returnFromDb);
        }

        [HttpGet("GetPartnersByCompanyIdIncludedPhysicallyMovingCosts/{companyId:min(1)}")]
        public async Task<IActionResult> GetByCompanyIdIncludedPhysicallyMovingCosts(int companyId)
        {
            var returnFromDb = await _iPartnerGetServices.GetByCompanyIdIncludedPhysicallyMovingCosts(companyId);

            return Ok(returnFromDb);
        }

        [HttpGet("GetAllHardwareSupplierByCompanyIdAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllHardwareSupplierByCompanyIdAsync(int companyId)
        {
            List<PartnerDto> entityFromoDb = await _iPartnerGetServices.GetAllHardwareSupplierByCompanyIdAsync(companyId);
            return Ok(entityFromoDb);
        }

        [HttpGet("GetAllPartnersByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllPartnersByIdCompanyAsync(int id)
        {
            List<PartnerDto> entityFromDb = await _iPartnerGetServices.GetAllByCompanyIdAsync(id);
            return Ok(entityFromDb);
        }

        [HttpGet("GetTotalPartnersByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetTotalPartnersByIdCompanyAsync(int id)
        {
            int total = await _iPartnerGetServices.GetTotalByCompanyIdAsync(id);
            return Ok(total);
        }


        [HttpGet("GetAllTransportersByCompanyIdAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllTransportersByCompanyIdAsync(int id)
        {
            List<PartnerDto> entityFromDb = await _iPartnerGetServices.GetAllTransportersByCompanyIdAsync(id);
            return Ok(entityFromDb);
        }

        [HttpGet("GetAllEletronicRepairAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllEletronicRepairAsync(int companyId)
        {
            List<PartnerDto> entityFromDb = await _iPartnerGetServices.GetAllEletronicRepairAsync(companyId);
            return Ok(entityFromDb);
        }
        
        [HttpGet("GetAllPartnersPagedAsync")]
        public async Task<IActionResult> GetAllPartnersPagedAsync([FromQuery] Params Params)
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

        [HttpPut("UpdatePartner/{partnerId:min(1)}")]
        public async Task<IActionResult> UpdatePartner(int partnerId, [FromBody] PartnerDto entityDto)
        {
            var statusCode = await _iPartnerUpdateServices.UpdateAsync(partnerId, entityDto);
            return Ok(statusCode);
        }


        [HttpPut("DeleteFakePartner/{customerId:min(1)}")]
        public async Task<IActionResult> DeleteFakePartner(int customerId)
        {
            var statusCode = await _iPartnerUpdateServices.DeleteFakeAsync(customerId);
            return Ok(statusCode);
        }

    }
}
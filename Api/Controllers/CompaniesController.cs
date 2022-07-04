using System;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Data.Context;
using Services.Dto;
using Services.Services.Contracts;

namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _COMPANY_SERVICES;
        public CompaniesController(ICompanyService COMPANY_SERVICES)
        {
            _COMPANY_SERVICES = COMPANY_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CompanyDto record)
        {
            try
            {
                CompanyDto returnToView = await _COMPANY_SERVICES.AddAsync(record);
                if (returnToView == null) return NoContent();

                return Ok(returnToView);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                CompanyDto[] _companyDto = await _COMPANY_SERVICES.GetAllAsync();
                if (_companyDto == null) return NotFound();
                return Ok(_companyDto);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }
    }
}

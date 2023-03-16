using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Dto;
using Application.Services.Contracts;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{

    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _COMPANY_SERVICES;
        public CompaniesController(ICompanyService COMPANY_SERVICES)
        {
            _COMPANY_SERVICES = COMPANY_SERVICES;
        }

        [HttpPost("PostCompany")]
        public async Task<IActionResult> PostCompany(CompanyDto entityDto)
        {
                CompanyDto entityToDb = await _COMPANY_SERVICES.AddAsync(entityDto);
                return Ok(entityToDb);
        }

        [HttpGet("GetAllCompaniesAsync")]
        public async Task<IActionResult> GetAllCompaniesAsync()
        {
                CompanyDto[] entityFromDb = await _COMPANY_SERVICES.GetAllAsync();
                return Ok(entityFromDb);
        }
    }
}

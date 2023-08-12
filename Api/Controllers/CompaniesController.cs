using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Main.Companies;

namespace Api.Controllers
{

    [ApiController]
    [AllowAnonymous]
    [Route("api/{controller}")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyAddService _COMPANY_SERVICES;
        public CompaniesController(ICompanyAddService COMPANY_SERVICES)
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

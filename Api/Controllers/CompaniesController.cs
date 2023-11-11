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
        private readonly ICompanyAddService _COMPANY_ADD_SERVICES;
        private readonly ICompanyGetService _COMPANY_GET_SERVICES;
        public CompaniesController(
            ICompanyAddService COMPANY_ADD_SERVICES,
            ICompanyGetService COMPANY_GET_SERVICES
            )
        {
            _COMPANY_ADD_SERVICES = COMPANY_ADD_SERVICES;
            _COMPANY_GET_SERVICES = COMPANY_GET_SERVICES;
        }

        [HttpPost("AddCompany")]
        public async Task<IActionResult> AddCompany(CompanyDto entityDto)
        {
                CompanyDto entityToDb = await _COMPANY_ADD_SERVICES.AddAsync(entityDto);
                return Ok(entityToDb);
        }

        // [HttpGet("GetByIdStockIncludedAsync/{id:min(1)}")]
        // public async Task<IActionResult> GetByIdStockIncludedAsync(int id)
        // {
        //         CompanyDto entityFromDb = await _COMPANY_GET_SERVICES.GetByIdStockIncludedAsync(id);
        //         return Ok(entityFromDb);
        // }
        
        // [HttpGet("GetAllCompaniesAsync")]
        // public async Task<IActionResult> GetAllCompaniesAsync()
        // {
        //         CompanyDto[] entityFromDb = await _COMPANY_GET_SERVICES.GetAllAsync();
        //         return Ok(entityFromDb);
        // }
    }
}

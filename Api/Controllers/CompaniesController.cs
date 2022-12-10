using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Post(CompanyDto entityDto)
        {
                CompanyDto entityToDb = await _COMPANY_SERVICES.AddAsync(entityDto);
                return Ok(entityToDb);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
                CompanyDto[] entityFromDb = await _COMPANY_SERVICES.GetAllAsync();
                return Ok(entityFromDb);
        }
    }
}

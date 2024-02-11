using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos.Fill;
using Application.Services.Operations.ProductServices.Fillers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class ManufacturersController : ControllerBase
    {
        private readonly IManufacturerFillCrudServices _iManufacturerFillCrudServices;

        public ManufacturersController(
            IManufacturerFillCrudServices IManufacturerFillCrudServices
            )
        {
            _iManufacturerFillCrudServices = IManufacturerFillCrudServices;
            
        }

        // [HttpPost("AddManufacturer")]
        // public async Task<ManufacturerDto> AddManufacturer([FromBody] ManufacturerDto entityDto)
        // {
        //     var fromDb = await _iManufacturerFillCrudServices.(entityDto);

        //     return fromDb;
        // }

        [HttpPost("AddManufacturers")]
        public async Task<KeyValuePair<string, int>> AddManufacturers([FromBody] List<ManufacturerDto> entityDto)
        {
            var fromDb = await _iManufacturerFillCrudServices.AddRangeAsync(entityDto);

            return fromDb;
        }

        [HttpGet("GetManufacturers/{companyId:min(1)}")]
        public async Task<List<ManufacturerDto>> GetManufacturers(int companyId)
        {
            var fromDb = await _iManufacturerFillCrudServices.GetAll(companyId);

            return fromDb;
        }

        // [HttpGet("GetAllPagedManufacturersAsync")]
        // public async Task<IActionResult> GetAllPagedManufacturersAsync([FromQuery] Params Params)
        // {
        //     PagedList<ManufacturerDto> returnFromDb = await _iManufacturerGetServices.GetAllPagedAsync(Params);
        //     if (returnFromDb == null) return null;

        //     Response.AddPagination(returnFromDb.CurrentPg,
        //                            returnFromDb.TotalPgs,
        //                            returnFromDb.PgSize,
        //                            returnFromDb.TotalCount,
        //                            returnFromDb.HasPrevious,
        //                            returnFromDb.HasNext);
        //     return Ok(returnFromDb.EntitiesToShow);
        // }

        // [HttpGet("LengthManufacturersAsync/{companyId:min(1)}")]
        // public async Task<IActionResult> LengthManufacturersAsync(int companyId)
        // {
        //     var totalCount = await _iManufacturerFillCrudServices.GetCountByCompanyIdAsync(companyId);
        //     return Ok(totalCount);
        // }
    }
}
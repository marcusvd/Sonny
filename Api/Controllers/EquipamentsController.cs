using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Products;
using Application.Services.Operations.Products.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pagination.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class EquipamentsController : ControllerBase
    {
        private readonly IEquipamentAddServices _iEquipamentAddServices;
        private readonly IEquipamentGetServices _iEquipamentGetServices;

        public EquipamentsController(
          IEquipamentAddServices IEquipamentAddServices,
          IEquipamentGetServices IEquipamentGetServices
          )
        {
            _iEquipamentAddServices = IEquipamentAddServices;
            _iEquipamentGetServices = IEquipamentGetServices;
        }

        [HttpPost("AddEquipament")]
        public async Task<EquipamentTypeDto> AddEquipament([FromBody] EquipamentTypeDto entityDto)
        {
            var fromDb = await _iEquipamentAddServices.AddAsync(entityDto);

            return fromDb;
        }
        [HttpPost("AddEquipaments")]
        public async Task<KeyValuePair<string, int>> AddEquipaments([FromBody] List<EquipamentTypeDto> entityDto)
        {
            var fromDb = await _iEquipamentAddServices.AddRangeAsync(entityDto);

            return fromDb;
        }

        [HttpGet("GetEquipaments/{companyId:min(1)}")]
        public async Task<List<EquipamentTypeDto>> GetEquipaments(int companyId)
        {
            var fromDb = await _iEquipamentGetServices.GetAllAsync(companyId);

            return fromDb;
        }

        [HttpGet("GetAllPagedEquipamentsAsync")]
        public async Task<IActionResult> GetAllPagedEquipamentsAsync([FromQuery] Params Params)
        {
            PagedList<EquipamentTypeDto> returnFromDb = await _iEquipamentGetServices.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("LengthEquipamentsAsync/{id}")]
        public async Task<IActionResult> LengthEquipamentsAsync(int id)
        {
            var totalCount = await _iEquipamentGetServices.GetCountByCompanyIdAsync(id);
            return Ok(totalCount);
        }

    }
}
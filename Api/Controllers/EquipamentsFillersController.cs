using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.ProductServices.Dtos.Fill;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pagination.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class EquipamentsFillersController : ControllerBase
    {
        private readonly IEquipamentFillCrudServices _iEquipamentFillCrudServices;
        private readonly IManufacturerFillCrudServices _iManufacturerFillCrudServices;
        private readonly ISegmentFillCrudServices _iSegmentFillCrudServices;

        public EquipamentsFillersController(
                                        IEquipamentFillCrudServices IEquipamentFillCrudServices,
                                        IManufacturerFillCrudServices IManufacturerFillCrudServices,
                                        ISegmentFillCrudServices ISegmentFillCrudServices
          )
        {
            _iEquipamentFillCrudServices = IEquipamentFillCrudServices;
            _iSegmentFillCrudServices = ISegmentFillCrudServices;
            _iManufacturerFillCrudServices = IManufacturerFillCrudServices;

        }

        [HttpPost("AddEquipamentFill")]
        public async Task<IActionResult> AddEquipamentFill([FromBody] List<Equipament_FillDto> entityDto)
        {
            var fromDb = await _iEquipamentFillCrudServices.AddRangeAsync(entityDto);

            return Ok(fromDb);
        }

        [HttpPost("AddManufacturerFill")]
        public async Task<IActionResult> AddManufacturerFill([FromBody] List<Manufacturer_FillDto> entityDto)
        {
            var fromDb = await _iManufacturerFillCrudServices.AddRangeAsync(entityDto);

            return Ok(fromDb);
        }

        [HttpPost("AddSegmentFill")]
        public async Task<IActionResult> AddSegmentFill([FromBody] List<Segment_FillDto> entityDto)
        {
            var fromDb = await _iSegmentFillCrudServices.AddRangeAsync(entityDto);

            return Ok(fromDb);
        }


        [HttpGet("GetEqtSegManAsync/{companyId:min(0)}")]
        public async Task<IActionResult> GetEqtSegManAsync(int companyId)
        {

            var resultReturn = new GetTogetherDto()
            {
                Equipaments_Fill = await _iEquipamentFillCrudServices.GetAll(companyId),
                Manufacturers_Fill = await _iManufacturerFillCrudServices.GetAll(companyId),
                Segments_Fill = await _iSegmentFillCrudServices.GetAll(companyId)
            };

            return Ok(resultReturn);
        }



    }
}
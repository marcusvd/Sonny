using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.StockProduct.ProductKind;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _PD_StockProductsTypesController : ControllerBase
    {
        public readonly IProductTypeAddServices _IProductTypeAddServices;
        public _PD_StockProductsTypesController(
          IProductTypeAddServices IProductTypeAddServices
        )
        {
            _IProductTypeAddServices = IProductTypeAddServices;
        }
        [HttpPost("AddProductTypeAsync")]
        public async Task<IActionResult> AddProductTypeAsync([FromBody] ProductTypeDto entityDto)
        {
            var toDbAdd = await _IProductTypeAddServices.AddAsync(entityDto);
            return Ok(toDbAdd);
        }

        [HttpGet("GetAllProductTypesByCompanyIdAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllProductTypesByCompanyIdAsync(int companyId)
        {
            var toDbGet = await _IProductTypeAddServices.GetAllProcuctsTypesByCompanyIdAsync(companyId);
            return Ok(toDbGet);
        }

    }
}
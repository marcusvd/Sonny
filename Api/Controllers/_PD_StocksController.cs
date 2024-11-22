using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


using Application.Services.Operations.StockProduct;
using Application.Services.Operations.StockProduct.ProductKind;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _PD_StocksController : ControllerBase
    {
        public readonly IStockAddServices _IStockAddServices;
        public _PD_StocksController(
          IStockAddServices IStockAddServices
        )
        {
            _IStockAddServices = IStockAddServices;
        }

        [HttpPost("AddProductAsync")]
        public async Task<IActionResult> AddProductAsync([FromBody] ProductDto entityDto)
        {
            var toDbAdd = await _IStockAddServices.AddAsync(entityDto);
            return Ok(toDbAdd);
        }

        [HttpPut("UpdatePartialProduct/{id:min(1)}")]
        public async Task<IActionResult> UpdatePartialProduct([FromBody] StockDto entityDto, int productId)
        {
            var toDbAdd = await _IStockAddServices.UpdatePartial(entityDto, productId);
            return Ok(toDbAdd);

        }

        [HttpGet("GetAllProductsByCompanyIdAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllProductsByCompanyIdAsync(int companyId)
        {
            var toDbGet = await _IStockAddServices.GetAllProductsByCompanyIdAsync(companyId);
            return Ok(toDbGet);
        }




    }
}
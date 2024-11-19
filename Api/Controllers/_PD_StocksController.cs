using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.StockProduct;

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
        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromBody] StockDto entityDto)
        {
            var toDbAdd = await _IStockAddServices.Update(entityDto);
            return Ok(toDbAdd);

        }

        [HttpGet("GetAllProductTypesByCompanyIdAsync/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllProductTypesByCompanyIdAsync(int companyId)
        {
            var toDbGet = await _IStockAddServices.GetAllProcuctsTypesByCompanyIdAsync(companyId);
            return Ok(toDbGet);
        }

    }
}
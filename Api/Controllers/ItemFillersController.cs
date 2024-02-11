using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices;
using Application.Services.Operations.ProductServices.Dtos.Fill;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class ItemsFillersController : ControllerBase
    {
        private readonly IItemFillCrudServices _iItemFillCrudServices;


        public ItemsFillersController(
                                        IItemFillCrudServices IItemFillCrudServices
                                       
          )
        {
            _iItemFillCrudServices = IItemFillCrudServices;

        }

        [HttpPut("UpdateAddItemFillAsync/{companyId:int:min(1)}")]
        public async Task<IActionResult> UpdateAddItemFillAsync([FromBody] List<ItemDto> entityDto, int companyId)
        {
            var fromDb = await _iItemFillCrudServices.UpdateAddItemFillAsync(entityDto, companyId);

            return Ok(fromDb);
        }
        
        // [HttpPost("AddItemFill")]
        // public async Task<IActionResult> AddItemFill([FromBody] List<ItemDto> entityDto)
        // {
        //     var fromDb = await _iItemFillCrudServices.AddItemFillAsync(entityDto);

        //     return Ok(fromDb);
        // }

        [HttpGet("GetItemFillAsync/{companyId:min(0)}")]
        public async Task<IActionResult> GetItemFillAsync(int companyId)
        {

            return Ok(await _iItemFillCrudServices.GetAllItemFill(companyId));
        }



    }
}
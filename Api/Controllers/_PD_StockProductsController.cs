// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Application.Services.Operations.StockProduct.ProductKind;

// namespace Api.Controllers
// {
//     [ApiController]
//     [Route("api/{controller}")]
//     [AllowAnonymous]
//     public class _PD_StockProductsController : ControllerBase
//     {
//         public readonly IProductAddServices _IProductAddServices;
//         public _PD_StockProductsController(
//           IProductAddServices IProductAddServices
//         )
//         {
//             _IProductAddServices = IProductAddServices;
//         }
//         [HttpPost("AddProductAsync")]
//         public async Task<IActionResult> AddProductAsync([FromBody] ProductDto entityDto)
//         {
//             var toDbAdd = await _IProductAddServices.AddAsync(entityDto);
//             return Ok(toDbAdd);
//         }

//         [HttpGet("GetAllProductsByCompanyIdAsync/{companyId:min(1)}")]
//         public async Task<IActionResult> GetAllProductsByCompanyIdAsync(int companyId)
//         {
//             var toDbGet = await _IProductAddServices.GetAllProcuctsByCompanyIdAsync(companyId);
//             return Ok(toDbGet);
//         }

//     }
// }
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Operations.Finances.Bank;
using Application.Services.Operations.Finances.Dtos.Bank;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class _FN_CreditCardLimitOperationsController : ControllerBase
    {
        private readonly ICreditCardLimitOperationsServices _iCreditCardLimitOperationsServices;

        public _FN_CreditCardLimitOperationsController(ICreditCardLimitOperationsServices ICreditCardLimitOperationsServices)
        {
            _iCreditCardLimitOperationsServices = ICreditCardLimitOperationsServices;
        }

        [HttpPut("UpdateCreditCardLimitOperation/{creditCardLimitOperationId:min(1)}")]
        public async Task<IActionResult> UpdateCreditCardLimitOperation(int creditCardLimitOperationId, [FromBody] CreditCardLimitOperationDto entityDto)
        {
            var statusCode = await _iCreditCardLimitOperationsServices.UpdateAsync(creditCardLimitOperationId, entityDto);
            return Ok(statusCode);
        }
       
    }
}
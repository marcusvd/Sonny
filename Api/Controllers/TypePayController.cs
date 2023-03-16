using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Contracts.Financial;
using Application.Dto.Financial;

namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class TypePayController : ControllerBase
    {
        private readonly ITypePaymentServices _TYPEPAY_SERVICES;
        public TypePayController(
            ITypePaymentServices TYPEPAY_SERVICES
            )
        {
            _TYPEPAY_SERVICES = TYPEPAY_SERVICES;

        }

        [HttpPost("PostTypePayment")]
        public async Task<IActionResult> PostTypePayment(TypePaymentDto entityDto)
        {
            TypePaymentDto EtntityToDb = await _TYPEPAY_SERVICES.AddAsync(entityDto);
            return Ok(EtntityToDb);
        }

        [HttpGet("GetAllTypePayment")]
        public async Task<IActionResult> GetAllTypePayment()
        {
            TypePaymentDto[] EntityFromDb = await _TYPEPAY_SERVICES.GetAllAsync();
            return Ok(EntityFromDb);
        }

    }
}
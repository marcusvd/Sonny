using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Services.Contracts.Financial;
using Services.Dto.Financial;

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

        [HttpPost]
        public async Task<IActionResult> Post(TypePaymentDto entityDto)
        {
            TypePaymentDto EtntityToDb = await _TYPEPAY_SERVICES.AddAsync(entityDto);
            return Ok(EtntityToDb);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            TypePaymentDto[] EntityFromDb = await _TYPEPAY_SERVICES.GetAllAsync();
            return Ok(EntityFromDb);
        }

    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;
namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]

    public class CustomersController : ControllerBase
    {
        private readonly ICustomerServices _CUSTOMER_SERVICES;
        public CustomersController(ICustomerServices CUSTOMER_SERVICES)
        {
            _CUSTOMER_SERVICES = CUSTOMER_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CustomerDto entityDto)
        {
            CustomerDto EntityToDb = await _CUSTOMER_SERVICES.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<CustomerDto> EntityFromDb = await _CUSTOMER_SERVICES.GetAllAsync();
            return Ok(EntityFromDb);
        }
    }
}
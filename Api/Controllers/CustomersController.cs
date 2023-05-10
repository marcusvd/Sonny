using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Dto;
using Application.Services.Operations.Customers;
using Pagination.Models;
using Services.Dto;

namespace Api.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/{controller}")]

    public class CustomersController : ControllerBase
    {
        private readonly ICustomerServices _CUSTOMER_SERVICES;
        public CustomersController(ICustomerServices CUSTOMER_SERVICES)
        {
            _CUSTOMER_SERVICES = CUSTOMER_SERVICES;
        }

        [HttpPost("PostCustomer")]
        public async Task<IActionResult> PostCustomer(CustomerDto entityDto)
        {
            CustomerDto EntityToDb = await _CUSTOMER_SERVICES.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllCustomersAsync")]
        public async Task<IActionResult> GetAllCustomersAsync()
        {
            List<CustomerDto> EntityFromDb = await _CUSTOMER_SERVICES.GetAllAsync();
            return Ok(EntityFromDb);
        }
        [HttpGet("GetAllCustomersByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllCustomersByIdCompanyAsync(int id)
        {
            List<CustomerDto> EntityFromDb = await _CUSTOMER_SERVICES.GetAllByCompanyIdAsync(id);
            return Ok(EntityFromDb);
        }


        [HttpGet("GetAllPagedCustomersAsync")]
        public async Task<IActionResult> GetAllPagedCustomersAsync([FromQuery] Params Params)
        {
                PagedListDto<CustomerDto> returnFromDb = await _CUSTOMER_SERVICES.GetAllPagedAsync(Params);
                if (returnFromDb == null) return null;

                Response.AddPagination(returnFromDb.CurrentPg,
                                       returnFromDb.TotalPgs,
                                       returnFromDb.PgSize,
                                       returnFromDb.TotalCount,
                                       returnFromDb.HasPrevious,
                                       returnFromDb.HasNext);
                return Ok(returnFromDb.EntitiesToShow);

         
        }
    }
}
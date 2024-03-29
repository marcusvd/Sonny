using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pagination.Models;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Customers;


namespace Api.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/{controller}")]

    public class CustomersController : ControllerBase
    {
        private readonly ICustomerAddServices _iCustomerAddServices;
        private readonly ICustomerGetServices _iCustomerGetServices;
        public CustomersController(
            ICustomerAddServices ICustomerAddServices,
            ICustomerGetServices ICustomerGetServices
        )
        {
            _iCustomerAddServices = ICustomerAddServices;
            _iCustomerGetServices = ICustomerGetServices;
        }

        [HttpPost("AddCustomer")]
        public async Task<IActionResult> AddCustomer(CustomerDto entityDto)
        {
            var statusCode = await _iCustomerAddServices.AddAsync(entityDto);
            return Ok(statusCode);
        }

        [HttpGet("GetAllCustomersAsync")]
        public async Task<IActionResult> GetAllCustomersAsync()
        {
            List<CustomerDto> EntityFromDb = await _iCustomerGetServices.GetAllAsync();
            return Ok(EntityFromDb);
        }
        [HttpGet("GetAllCustomersByIdCompanyAsync/{id:min(1)}")]
        public async Task<IActionResult> GetAllCustomersByIdCompanyAsync(int id)
        {
            List<CustomerDto> EntityFromDb = await _iCustomerGetServices.GetAllByCompanyIdAsync(id);
            return Ok(EntityFromDb);
        }

        [HttpGet("GetAllCustomersPagedAsync")]
        public async Task<IActionResult> GetAllCustomersPagedAsync([FromQuery] Params Params)
        {
            PagedList<CustomerDto> returnFromDb = await _iCustomerGetServices.GetAllPagedAsync(Params);
            
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("LengthAsync/{id}")]
        public async Task<IActionResult> LengthAsync(int id)
        {
            var totalCount = await _iCustomerGetServices.GetLengthAsync(id);

            return Ok(totalCount);
        }


        [HttpGet("GetByIdIcludedPhysicallyMovingCosts/{customerId:min(1)}")]
        public async Task<IActionResult> GetByIdIcludedPhysicallyMovingCosts(int customerId)
        {
            var returnFromDb = await _iCustomerGetServices.GetByIdIcludedPhysicallyMovingCosts(customerId);

            return Ok(returnFromDb);
        }
    }
}
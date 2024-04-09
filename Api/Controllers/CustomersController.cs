using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pagination.Models;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Customers;
using Microsoft.EntityFrameworkCore.Update.Internal;


namespace Api.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/{controller}")]

    public class CustomersController : ControllerBase
    {
        private readonly ICustomerAddServices _iCustomerAddServices;
        private readonly ICustomerGetServices _iCustomerGetServices;
        private readonly ICustomerUpdateServices _iCustomerUpdateServices;
        public CustomersController(
            ICustomerAddServices ICustomerAddServices,
            ICustomerGetServices ICustomerGetServices,
            ICustomerUpdateServices ICustomerUpdateServices
        )
        {
            _iCustomerAddServices = ICustomerAddServices;
            _iCustomerGetServices = ICustomerGetServices;
            _iCustomerUpdateServices = ICustomerUpdateServices;
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
        [HttpGet("GetAllCustomersByTermSearchPagedAsync")]
        public async Task<IActionResult> GetAllCustomersByTermSearchPagedAsync([FromQuery] Params Params)
        {
            PagedList<CustomerDto> returnFromDb = await _iCustomerGetServices.GetAllCustomersByTermSearchPagedAsync(Params);
            
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

        [HttpGet("GetByIdIncludedPhysicallyMovingCosts/{customerId:min(1)}")]
        public async Task<IActionResult> GetByIdIncludedPhysicallyMovingCosts(int customerId)
        {
            var returnFromDb = await _iCustomerGetServices.GetByIdIncludedPhysicallyMovingCosts(customerId);

            return Ok(returnFromDb);
        }

        [HttpGet("GetByIdAllIncluded/{customerId:min(1)}")]
        public async Task<IActionResult> GetByIdAllIncluded(int customerId)
        {
            var returnFromDb = await _iCustomerGetServices.GetByIdAllIncluded(customerId);

            return Ok(returnFromDb);
        }

        [HttpPut("Update/{customerId:min(1)}")]
        public async Task<IActionResult> Update(int customerId, [FromBody] CustomerDto entityDto)
        {
            var statusCode = await _iCustomerUpdateServices.UpdateAsync(customerId, entityDto);
            return Ok(statusCode);
        }

        [HttpPut("DeleteFake/{customerId:min(1)}")]
        public async Task<IActionResult> DeleteFake(int customerId)
        {
            var statusCode = await _iCustomerUpdateServices.DeleteFakeAsync(customerId);
            return Ok(statusCode);
        }



    }
}
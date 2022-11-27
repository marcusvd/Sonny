using System.Linq;
using System.IO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using Services.Dto;
using Services.Services.Contracts;
using Pagination;
using Microsoft.AspNetCore.Builder;
using Api.Helpers.Validators;
using FluentValidation.Results;

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
            if (EntityToDb == null) return NoContent();
            return Ok(EntityToDb);
            
        }

    }
}
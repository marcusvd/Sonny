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
        public async Task<IActionResult> Post(CustomerDto model)
        {
            try
            {
                CustomerDto record = await _CUSTOMER_SERVICES.AddAsync(model);
                if (record == null) return NoContent();

                return Ok(record);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou, erro: {ex.Message}");
            }
        }

       

    }
}
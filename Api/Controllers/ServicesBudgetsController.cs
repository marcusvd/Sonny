using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Services.Contracts;
using System.Collections.Generic;
using Services.Dto.ServiceBudgetBench;

namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class ServicesBudgetsController : ControllerBase
    {
        private readonly IServiceBudgetServices _SERVICEBUDGET_SERVICES;
        public ServicesBudgetsController(IServiceBudgetServices SERVICEBUDGET_SERVICES)
        {
            _SERVICEBUDGET_SERVICES = SERVICEBUDGET_SERVICES;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                List<ServiceBudgetDto> records = await _SERVICEBUDGET_SERVICES.GetAllAsync(false);
                if (records == null) return NotFound();
                return Ok(records);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }

        [HttpGet("GetAllIncludedAsync")]
        public async Task<IActionResult> GetAllIncludedAsync()
        {
            try
            {
                List<ServiceBudgetDto> records = await _SERVICEBUDGET_SERVICES.GetAllAsync(true);
                if (records == null) return NotFound();
                return Ok(records);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var record = await _SERVICEBUDGET_SERVICES.GetByIdAsync(id, false);
                if (record == null) return NotFound();
                return Ok(record);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }

        [HttpGet("GetByIdAsyncIncluded/{id}")]
        public async Task<IActionResult> GetByIdAsyncIncluded(int id)
        {
            try
            {
                var record = await _SERVICEBUDGET_SERVICES.GetByIdAsync(id, true);
                if (record == null) return NotFound();
                return Ok(record);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(ServiceBudgetDto record)
        {
            try
            {
                ServiceBudgetDto returnToView = await _SERVICEBUDGET_SERVICES.AddAsync(record);
                if (returnToView == null) return NoContent();

                return Ok(returnToView);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ServiceBudgetDto Update)
        {
            try
            {
                if (id != Update.Id) return BadRequest();
                var record = await _SERVICEBUDGET_SERVICES.Update(Update);
                if (record == null) return NotFound();
                return Ok(record);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }

        // [HttpGet]
        // public async Task<IActionRes>



    }
}
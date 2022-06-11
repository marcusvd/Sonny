using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.Services.Contracts;

namespace Api.Controllers
{

    [ApiController]
    [Route("api/{controller}")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryServices _CATEGORY_SERVICES;
        public CategoriesController(ICategoryServices CATEGORY_SERVICES)
        {
            _CATEGORY_SERVICES = CATEGORY_SERVICES;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CategoryDto record)
        {
            try
            {
                CategoryDto returnToView = await _CATEGORY_SERVICES.AddAsync(record);
                if (returnToView == null) return NoContent();

                return Ok(returnToView);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                CategoryDto[] categoryDto = await _CATEGORY_SERVICES.GetAllAsync();
                if (categoryDto == null) return NotFound();
                return Ok(categoryDto);
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
                CategoryDto[] categoryDto = await _CATEGORY_SERVICES.GetAllAsync(true);
                if (categoryDto == null) return NotFound();
                return Ok(categoryDto);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"A base de dados falhou {ex.Message}");
            }
        }

        // [HttpGet("GetAllAsyncIncluded")]
        // public async Task<IActionResult> GetAllAsync()
        // {

        // }




    }
}
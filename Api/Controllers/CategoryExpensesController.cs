using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;
using Pagination.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class CategoryExpensesController : ControllerBase
    {
        private readonly ICategoryExpensesServices _iCategoryExpensesServices;

        public CategoryExpensesController(ICategoryExpensesServices ICategoryExpensesServices)
        {
            _iCategoryExpensesServices = ICategoryExpensesServices;
        }

        // [HttpPost("AddFixedExpenses")]
        // public async Task<IActionResult> AddFixedExpenses([FromBody] MonthFixedExpensesDto entityDto)
        // {
        //     MonthFixedExpensesDto EntityToDb = await _iMonthFixedExpensesFillersServices.AddAsync(entityDto);
        //     return Ok(EntityToDb);
        // }
        
        [HttpPost("AddCategoryExpenses")]
        public async Task<IActionResult> AddCategoryExpenses([FromBody] CategoryExpensesDto entityDto)
        {
            var EntityToDb = await _iCategoryExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllCategoryExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllCategoryExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iCategoryExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

        // [HttpGet("GetAllFixedExpensesPagedAsync")]
        // public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
        // {
        //     var returnFromDb = await _iMonthFixedExpensesFillersServices.GetAllPagedAsync(Params);
        //     if (returnFromDb == null) return null;

        //     Response.AddPagination(returnFromDb.CurrentPg,
        //                            returnFromDb.TotalPgs,
        //                            returnFromDb.PgSize,
        //                            returnFromDb.TotalCount,
        //                            returnFromDb.HasPrevious,
        //                            returnFromDb.HasNext);
        //     return Ok(returnFromDb.EntitiesToShow);
        // }

        // [HttpGet("GetFixedExpensesByIdAllIncluded/{fixedExpensesId:min(1)}")]
        // public async Task<IActionResult> GetFixedExpensesByIdAllIncluded(int fixedExpensesId)
        // {
        //     var returnFromDb = await _iMonthFixedExpensesFillersServices.GetByIdAllIncluded(fixedExpensesId);

        //     return Ok(returnFromDb);
        // }

    }
}
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
    public class YearlyFixedExpensesController : ControllerBase
    {
        private readonly IYearlyFixedExpensesServices _iYearlyFixedExpensesServices;

        public YearlyFixedExpensesController(IYearlyFixedExpensesServices IYearlyFixedExpensesServices)
        {
            _iYearlyFixedExpensesServices = IYearlyFixedExpensesServices;
        }

        [HttpPost("AddYearlyFixedExpenses")]
        public async Task<IActionResult> AddYearlyFixedExpenses([FromBody] YearlyFixedExpensesDto entityDto)
        {
            YearlyFixedExpensesDto EntityToDb = await _iYearlyFixedExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }
        
        // [HttpPost("YearlyAddFixedExpensesFillers")]
        // public async Task<IActionResult> AddFixedExpensesFillers([FromBody] YearlyFixedExpensesFillersDto entityDto)
        // {
        //     var EntityToDb = await _iYearlyFixedExpensesServices.AddYearlyFixedExpensesFillersAsync(entityDto);
        //     return Ok(EntityToDb);
        // }
        

        [HttpGet("GetAllYearlyFixedExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllYearlyFixedExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iYearlyFixedExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

        [HttpGet("YearlyGetAllFixedExpensesPagedAsync")]
        public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iYearlyFixedExpensesServices.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("YearlyGetFixedExpensesByIdAllIncluded/{fixedExpensesId:min(1)}")]
        public async Task<IActionResult> GetFixedExpensesByIdAllIncluded(int fixedExpensesId)
        {
            var returnFromDb = await _iYearlyFixedExpensesServices.GetByIdAllIncluded(fixedExpensesId);

            return Ok(returnFromDb);
        }

    }
}
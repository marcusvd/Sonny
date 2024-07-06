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
    public class YearlyFixedExpensesFillersController : ControllerBase
    {
        private readonly IYearlyFixedExpensesFillersServices _iYearlyFixedExpensesFillersServices;

        public YearlyFixedExpensesFillersController(IYearlyFixedExpensesFillersServices IYearlyFixedExpensesFillersServices)
        {
            _iYearlyFixedExpensesFillersServices = IYearlyFixedExpensesFillersServices;
        }



        [HttpGet("GetAllYearlyFixedExpensesFillersByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllFixedExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iYearlyFixedExpensesFillersServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

        // [HttpGet("GetAllFixedExpensesPagedAsync")]
        // public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
        // {
        //     var returnFromDb = await _iYearlyFixedExpensesFillersServices.GetAllPagedAsync(Params);
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
        //     var returnFromDb = await _iYearlyFixedExpensesFillersServices.GetByIdAllIncluded(fixedExpensesId);

        //     return Ok(returnFromDb);
        // }

    }
}
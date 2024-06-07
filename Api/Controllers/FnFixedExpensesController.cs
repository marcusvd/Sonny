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
    public class FnFixedExpensesController : ControllerBase
    {
        private readonly IFnFixedExpensesServices _iFnFixedExpensesServices;

        public FnFixedExpensesController(IFnFixedExpensesServices IFnFixedExpensesServices)
        {
            _iFnFixedExpensesServices = IFnFixedExpensesServices;
        }

        [HttpPost("AddFixedExpenses")]
        public async Task<IActionResult> AddFixedExpenses([FromBody] FixedExpensesDto entityDto)
        {
            FixedExpensesDto EntityToDb = await _iFnFixedExpensesServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        [HttpGet("GetAllFixedExpensesByCompanyId/{companyId:min(1)}")]
        public async Task<IActionResult> GetAllFixedExpensesByCompanyId(int companyId)
        {
            var EntityFromDb = await _iFnFixedExpensesServices.GetAllAsync(companyId);
            return Ok(EntityFromDb);
        }

        [HttpGet("GetAllFixedExpensesPagedAsync")]
        public async Task<IActionResult> GetAllFixedExpensesPagedAsync([FromQuery] Params Params)
        {
            var returnFromDb = await _iFnFixedExpensesServices.GetAllPagedAsync(Params);
            if (returnFromDb == null) return null;

            Response.AddPagination(returnFromDb.CurrentPg,
                                   returnFromDb.TotalPgs,
                                   returnFromDb.PgSize,
                                   returnFromDb.TotalCount,
                                   returnFromDb.HasPrevious,
                                   returnFromDb.HasNext);
            return Ok(returnFromDb.EntitiesToShow);
        }

        [HttpGet("GetFixedExpensesByIdAllIncluded/{fixedExpensesId:min(1)}")]
        public async Task<IActionResult> GetFixedExpensesByIdAllIncluded(int fixedExpensesId)
        {
            var returnFromDb = await _iFnFixedExpensesServices.GetByIdAllIncluded(fixedExpensesId);

            return Ok(returnFromDb);
        }

    }
}
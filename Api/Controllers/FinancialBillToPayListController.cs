using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Operations.Finances;
using Application.Services.Operations.Finances.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    [AllowAnonymous]
    public class FinancialBillToPayListController : ControllerBase
    {
        private readonly IFinancialBillToPayListServices _iFinancialBillToPayListServices;

        public FinancialBillToPayListController(IFinancialBillToPayListServices IFinancialBillToPayListServices)
        {
            _iFinancialBillToPayListServices = IFinancialBillToPayListServices;
        }

        [HttpPost("AddBillToPayList")]
        public async Task<IActionResult> AddBillToPayList(FinancialBillToPayListDto entityDto)
        {
            FinancialBillToPayListDto EntityToDb = await _iFinancialBillToPayListServices.AddAsync(entityDto);
            return Ok(EntityToDb);
        }

        // [HttpGet("GetAllFinancingLoan")]
        // public async Task<IActionResult> GetAllFinancingLoan()
        // {
        //     FinancingLoanDto[] EntityFromDb = await _iFinancialBillToPayListServices.GetAllAsync();
        //     return Ok(EntityFromDb);
        // }
    }
}
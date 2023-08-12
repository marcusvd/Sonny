using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/{controller}")]
[AllowAnonymous]
public class BudgetsServicesController : ControllerBase
{
    private readonly IBudgetServiceAddServices _iBudgetServiceAddServices;
    private readonly IBudgetServiceUpdateServices _iBudgetServiceUpdateServices;
    public BudgetsServicesController(
        IBudgetServiceAddServices IBudgetServiceAddServices,
        IBudgetServiceUpdateServices IBudgetServiceUpdateServices
        )
    {
        _iBudgetServiceAddServices = IBudgetServiceAddServices;
        _iBudgetServiceUpdateServices = IBudgetServiceUpdateServices;
    }

    [HttpPost("AddBudgetService")]
    public async Task<IActionResult> AddBudgetService([FromBody] BudgetServiceDto entityDto)
    {
        var toDbAdd = await _iBudgetServiceAddServices.AddAsync(entityDto);

        return Ok(toDbAdd);
    }

    [HttpPut("UpdateBudgetServices/{budgetServiceId:min(0)}")]
    public async Task<IActionResult> UpdateBudgetServices(int budgetServiceId, [FromBody] BudgetServiceDto entityDto)
    {
        var toDbUpdate = await _iBudgetServiceUpdateServices.UpdateAsync(budgetServiceId, entityDto);
        return Ok(toDbUpdate);
    }

}

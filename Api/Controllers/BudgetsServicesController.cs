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
    private readonly IOpenBudgetServiceServices _iOpenBudgetServiceServices;
    public BudgetsServicesController(
        IBudgetServiceAddServices IBudgetServiceAddServices,
        IOpenBudgetServiceServices IOpenBudgetServiceServices
        )
    {
        _iBudgetServiceAddServices = IBudgetServiceAddServices;
        _iOpenBudgetServiceServices = IOpenBudgetServiceServices;
    }

    [HttpPost("AddBudgetService")]
    public async Task<IActionResult> AddBudgetService([FromBody] BudgetServiceDto entityDto)
    {
        var toDbAdd = await _iBudgetServiceAddServices.AddAsync(entityDto);

        return Ok(toDbAdd);
    }

    [HttpPut("OpenBudgetServices/{budgetServiceId:min(0)}")]
    public async Task<IActionResult> OpenBudgetServices(int budgetServiceId, [FromBody] BudgetServiceDto entityDto)
    {
        var toDbUpdate = await _iOpenBudgetServiceServices.OpenServiceAsync(budgetServiceId, entityDto);
        return Ok(toDbUpdate);
    }

}

using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/{controller}")]
[AllowAnonymous]
public class TableProvidedServicesPricesController : ControllerBase
{
    private readonly ITableProvidedServicePriceAddServices _iTableProvidedServicePriceAddServices;
    public TableProvidedServicesPricesController(
        ITableProvidedServicePriceAddServices ITableProvidedServicePriceAddServices
        )
    {
        _iTableProvidedServicePriceAddServices = ITableProvidedServicePriceAddServices;
    }

    [HttpPost("AddTableProvidedServicePrice")]
    public async Task<IActionResult> AddTableProvidedServicePrice([FromBody] TableProvidedServicePriceDto entityDto)
    {
        var toDbAdd = await _iTableProvidedServicePriceAddServices.AddAsync(entityDto);
        return Ok(toDbAdd);
    }
}

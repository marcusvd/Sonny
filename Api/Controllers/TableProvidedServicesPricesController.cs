using System.Collections.Generic;
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

    [HttpPost("AddTableProvidedServicesPrices")]
    public async Task<IActionResult> AddTableProvidedServicesPrices([FromBody] List<TableProvidedServicePriceDto> entities)
    {
        var toDbAdd = await _iTableProvidedServicePriceAddServices.AddRangeAsync(entities);
        return Ok(toDbAdd);
    }
}

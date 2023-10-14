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
    private readonly ITableProvidedServicePriceGetServices _iTableProvidedServicePriceGetServices;
    public TableProvidedServicesPricesController(
        ITableProvidedServicePriceAddServices ITableProvidedServicePriceAddServices,
        ITableProvidedServicePriceGetServices ITableProvidedServicePriceGetServices
        )
    {
        _iTableProvidedServicePriceAddServices = ITableProvidedServicePriceAddServices;
        _iTableProvidedServicePriceGetServices = ITableProvidedServicePriceGetServices;
    }

    [HttpPost("AddTableProvidedServicesPrices")]
    public async Task<IActionResult> AddTableProvidedServicesPrices([FromBody] List<TableProvidedServicePriceDto> entities)
    {
        var toDbAdd = await _iTableProvidedServicePriceAddServices.AddRangeAsync(entities);
        return Ok(toDbAdd);
    }

    [HttpGet("GetAllAsync/{companyId:min(0)}")]
    public async Task<IActionResult> GetAllAsync(int companyId)
    {
        var FromDBToView = await _iTableProvidedServicePriceGetServices.GetAllAsync(companyId);
        return Ok(FromDBToView);
    }




}

using System;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.BenchBudgetService;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pagination.Models;

[ApiController]
[Route("api/{controller}")]
[AllowAnonymous]
public class BudgetsServicesController : ControllerBase
{
    private readonly IBudgetServiceAddServices _iBudgetServiceAddServices;
    private readonly IBudgetServiceGetServices _iBudgetServiceGetServices;
    private readonly IOpenBudgetServiceServices _iOpenBudgetServiceServices;
    public BudgetsServicesController(
        IBudgetServiceAddServices IBudgetServiceAddServices,
        IOpenBudgetServiceServices IOpenBudgetServiceServices,
        IBudgetServiceGetServices IBudgetServiceGetServices
        )
    {
        _iBudgetServiceAddServices = IBudgetServiceAddServices;
        _iOpenBudgetServiceServices = IOpenBudgetServiceServices;
        _iBudgetServiceGetServices = IBudgetServiceGetServices;
    }

    [HttpPost("AddBudgetService")]
    public async Task<IActionResult> AddBudgetService([FromBody] BudgetServiceDto entityDto)
    {
        var toDbAdd = await _iBudgetServiceAddServices.AddAsync(entityDto);

        return Ok(toDbAdd);
    }
    [HttpGet("LengthBudgetAsync/{companyId:min(0)}")]
    public async Task<int> LengthBudgetAsync(int companyId)
    {
        var toView = await _iBudgetServiceGetServices.GetBudgetCountByCompanyIdAsync(companyId);
        return toView;
    }

    [HttpGet("GetAllPagedNoFinished")]
    public async Task<IActionResult> GetAllPagedNoFinished([FromQuery] Params Params)
    {
        var returnFromDb = await _iBudgetServiceGetServices.GetBudgetCustomerIncludeAsync(Params);

        if (returnFromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        Response.AddPagination(
                                returnFromDb.CurrentPg,
                                returnFromDb.TotalPgs,
                                returnFromDb.PgSize,
                                returnFromDb.TotalCount,
                                returnFromDb.HasPrevious,
                                returnFromDb.HasNext);

        return Ok(returnFromDb.EntitiesToShow);
    }

    [HttpGet("LengthEditServicesAsync/{companyId:min(0)}")]
    public async Task<int> LengthEditServicesAsync(int companyId)
    {
        var toView = await _iBudgetServiceGetServices.GetServiceCountByCompanyIdAsync(companyId);
        return toView;
    }

    [HttpGet("GetAllPagedEditServicesAsync")]
    public async Task<IActionResult> GetAllPagedEditServicesAsync([FromQuery] Params Params)
    {
        var returnFromDb = await _iBudgetServiceGetServices.GetServiceCustomerIncludeAsync(Params);

        if (returnFromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        Response.AddPagination(
                                returnFromDb.CurrentPg,
                                returnFromDb.TotalPgs,
                                returnFromDb.PgSize,
                                returnFromDb.TotalCount,
                                returnFromDb.HasPrevious,
                                returnFromDb.HasNext);

        return Ok(returnFromDb.EntitiesToShow);
    }


    [HttpGet("GetByIdIncludeAsync/{budgetServiceId:min(0)}")]
    public async Task<IActionResult> GetByIdIncludeAsync(int budgetServiceId)
    {
        var FromDb = await _iBudgetServiceGetServices.GetByIdIncludeAsync(budgetServiceId);

        return Ok(FromDb);
    }


    [HttpPut("OpenBudgetServices/{budgetServiceId:min(0)}")]
    public async Task<IActionResult> OpenBudgetServices(int budgetServiceId, [FromBody] BudgetServiceDto entityDto)
    {
        var toDbUpdate = await _iOpenBudgetServiceServices.OpenServiceAsync(budgetServiceId, entityDto);

        return Ok(toDbUpdate);
    }
}

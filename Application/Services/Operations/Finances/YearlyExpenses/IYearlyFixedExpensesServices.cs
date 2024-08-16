using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances.YearlyExpenses
{
    public interface IYearlyFixedExpensesServices
    {
        Task<YearlyFixedExpensesDto> AddAsync(YearlyFixedExpensesDto entityDto);
        // Task<HttpStatusCode> AddYearlyFixedExpensesFillersAsync(YearlyFixedExpensesFillersDto entityDto);
        Task<List<YearlyFixedExpensesDto>> GetAllAsync(int companyId);
        Task<PagedList<YearlyFixedExpensesDto>> GetAllPagedAsync(Params parameters);
        Task<YearlyFixedExpensesDto> GetByIdAllIncluded(int yearlyFixedExpensesId);
    }
}
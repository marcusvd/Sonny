using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances.YearlyExpenses
{
    public interface IYearlyFixedExpensesServices
    {
        Task<YearlyFixedExpenseDto> AddAsync(YearlyFixedExpenseDto entityDto);
        // Task<HttpStatusCode> AddYearlyFixedExpensesFillersAsync(YearlyFixedExpensesFillersDto entityDto);
        Task<List<YearlyFixedExpenseDto>> GetAllAsync(int companyId);
        Task<PagedList<YearlyFixedExpenseDto>> GetAllPagedAsync(Params parameters);
        Task<YearlyFixedExpenseDto> GetByIdAllIncluded(int yearlyFixedExpensesId);
    }
}
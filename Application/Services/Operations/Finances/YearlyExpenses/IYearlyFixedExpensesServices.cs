using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.YearlyExpenses
{
    public interface IYearlyFixedExpensesServices
    {
        Task<HttpStatusCode> AddAsync(YearlyFixedExpenseDto entityDto);
        Task<List<YearlyFixedExpenseDto>> GetAllAsync(int companyId);
        Task<PagedList<YearlyFixedExpenseDto>> GetAllPagedAsync(Params parameters);
        Task<YearlyFixedExpenseDto> GetByIdAllIncluded(int yearlyFixedExpensesId);
        Task<HttpStatusCode> UpdateAsync(int yearlyfixedExpensesId, YearlyFixedExpensePaymentDto entity);
    }
}
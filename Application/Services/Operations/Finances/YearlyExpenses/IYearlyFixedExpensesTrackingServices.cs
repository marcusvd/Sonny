using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances.YearlyExpenses
{
    public interface IYearlyFixedExpensesTrackingServices
    {
        Task<HttpStatusCode> AddAsync(YearlyFixedExpensesTrackingDto entityDto);
        Task<PagedList<YearlyFixedExpensesTrackingDto>> GetAllPagedAsync(Params parameters);
        Task<List<YearlyFixedExpensesTrackingDto>> GetAllByCompanyIdAsync(int id);
        Task<YearlyFixedExpensesTrackingDto> GetByIdAllIncluded(int yearlyFixedExpensesTrackingId);
        Task<HttpStatusCode> UpdateAsync(int yearlyFixedExpensesTrackingId, YearlyFixedExpensesTrackingDto entity);
    }
}
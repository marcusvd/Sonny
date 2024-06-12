using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Finances
{
    public interface IMonthFixedExpensesTrackingServices
    {
        Task<HttpStatusCode> AddAsync(MonthFixedExpensesTrackingDto entityDto);
        void AddEssentialExpensesTest(int companyId);
        Task<PagedList<MonthFixedExpensesTrackingDto>> GetAllPagedAsync(Params parameters);
        Task<List<MonthFixedExpensesTrackingDto>> GetAllByCompanyIdAsync(int id);
        Task<MonthFixedExpensesTrackingDto> GetByIdAllIncluded(int FixedExpensesTrackingId);
        Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, MonthFixedExpensesTrackingDto entity);
    }
}
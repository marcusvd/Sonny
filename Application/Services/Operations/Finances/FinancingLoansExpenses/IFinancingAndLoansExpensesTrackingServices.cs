using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Dtos.FinancingLoansExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.FinancingLoansExpenses
{
    public interface IFinancingAndLoansExpensesTrackingServices
    {
        Task<HttpStatusCode> AddAsync(FinancingAndLoansExpensesTrackingDto entityDto);
        Task<PagedList<FinancingAndLoansExpensesTrackingDto>> GetAllPagedAsync(Params parameters);
        Task<List<FinancingAndLoansExpensesTrackingDto>> GetAllByCompanyIdAsync(int id);
        Task<FinancingAndLoansExpensesTrackingDto> GetByIdAllIncluded(int yearlyFixedExpensesTrackingId);
        Task<HttpStatusCode> UpdateAsync(int yearlyFixedExpensesTrackingId, FinancingAndLoansExpensesTrackingDto entity);
    }
}
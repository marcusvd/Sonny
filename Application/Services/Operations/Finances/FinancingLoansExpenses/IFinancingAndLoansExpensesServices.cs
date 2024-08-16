using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Dtos.FinancingLoansExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.FinancingLoansExpenses
{
    public interface IFinancingAndLoansExpensesServices
    {
        Task<FinancingAndLoansExpensesDto> AddAsync(FinancingAndLoansExpensesDto entityDto);
        // Task<HttpStatusCode> AddYearlyFixedExpensesFillersAsync(YearlyFixedExpensesFillersDto entityDto);
        Task<List<FinancingAndLoansExpensesDto>> GetAllAsync(int companyId);
        Task<PagedList<FinancingAndLoansExpensesDto>> GetAllPagedAsync(Params parameters);
        Task<FinancingAndLoansExpensesDto> GetByIdAllIncluded(int yearlyFixedExpensesId);
    }
}
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.FinancingsLoansExpenses
{
    public interface IFinancingsAndLoansExpensesServices
    {
        Task<FinancingAndLoanExpenseDto> AddAsync(FinancingAndLoanExpenseDto entityDto);
        // Task<HttpStatusCode> AddYearlyFixedExpensesFillersAsync(YearlyFixedExpensesFillersDto entityDto);
        Task<List<FinancingAndLoanExpenseDto>> GetAllAsync(int companyId);
        Task<PagedList<FinancingAndLoanExpenseDto>> GetAllPagedAsync(Params parameters);
        Task<FinancingAndLoanExpenseDto> GetByIdAllIncluded(int yearlyFixedExpensesId);
    }
}
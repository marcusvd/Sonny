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
        // Task<HttpStatusCode> AddAsync(FinancingAndLoanExpenseDto entityDto);
        Task<HttpStatusCode> AddRangeAsync(FinancingAndLoanExpenseDto entityDto);
        Task<List<FinancingAndLoanExpenseDto>> GetAllAsync(int companyId);
        Task<List<FinancingAndLoanExpenseInstallmentDto>> GetAllInstallmentAsync(int companyId);
        Task<List<FinancingAndLoanExpenseInstallmentDto>> GetInstallmentsByFinancingsAndLoansExpensesIdAsync(int financingAndLoanExpenseId);
        Task<PagedList<FinancingAndLoanExpenseDto>> GetAllPagedAsync(Params parameters);
        Task<FinancingAndLoanExpenseDto> GetByIdAllIncluded(int yearlyFixedExpensesId);
        Task<HttpStatusCode> PaymentAsync(int financingAndLoanId, FinancingAndLoanExpenseInstallmentPaymentDto entity);
    }
}
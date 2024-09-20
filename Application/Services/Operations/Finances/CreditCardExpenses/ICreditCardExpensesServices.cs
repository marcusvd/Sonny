using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
    public interface ICreditCardExpensesServices
    {
        Task<HttpStatusCode> AddCreditCardExpenseAsync(CreditCardExpenseDto entityDto);
        Task<List<CreditCardExpenseDto>> GetAllAsync(int companyId);
        Task<List<CardDto>> GetAllCreditCardsOnlyByCompanyIdAsync(int companyId);
        Task<List<CreditCardExpenseDto>> GetCreditCardExpensesByIdInvoice(int invoiceId);
        // Task<HttpStatusCode> AddCategoryExpensesAsync(CategoryExpenseDto entityDto);
        // Task<PagedList<CreditCardExpenseDto>> GetAllPagedAsync(Params parameters);
        // Task<CreditCardExpenseDto> GetByIdAllIncluded(int monthFixedExpensesId);
        // Task<bool> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId);
        // Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, CreditCardExpenseDto entity);
    }
}
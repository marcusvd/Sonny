using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
  public interface ICreditCardExpensesInvoiceServices
  {
    // Task<HttpStatusCode> AddCreditCardExpenseInvoiceAsync(CreditCardExpenseInvoiceDto entityDto);
     Task<HttpStatusCode> AddInvoicesAsync(List<CreditCardExpenseInvoiceDto> listInvoices);
    //Task<List<string>> AddInvoicesAsync(List<CreditCardExpenseInvoiceDto> listInvoices);

    Task<List<CreditCardExpenseInvoiceDto>> GetAllByCardIdAsync(int cardId);
    Task<HttpStatusCode> UpdateAsync(int invoiceId, CreditCardExpenseInvoiceDto entity);
    Task<HttpStatusCode> SumCreditCardExpenses(int invoiceId);

    // Task<HttpStatusCode> AddCategoryExpensesAsync(CategoryExpenseDto entityDto);
    // Task<PagedList<CreditCardExpenseDto>> GetAllPagedAsync(Params parameters);
    // Task<CreditCardExpenseDto> GetByIdAllIncluded(int monthFixedExpensesId);
    // Task<bool> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId);
    // Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, CreditCardExpenseDto entity);
  }
}
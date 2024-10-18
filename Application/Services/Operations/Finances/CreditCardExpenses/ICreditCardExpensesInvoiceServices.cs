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
     Task<HttpStatusCode> AddInvoicesAsync(List<CreditCardExpenseInvoiceDto> listInvoices);
    Task<List<CreditCardExpenseInvoiceDto>> GetAllByCardIdAsync(int cardId);
    Task<HttpStatusCode> UpdateAsync(int invoiceId, CreditCardExpenseInvoiceDto entity);
    Task<HttpStatusCode> SumCreditCardExpenses(int invoiceId);
  }
}
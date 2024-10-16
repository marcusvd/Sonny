using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Pagination.Models;

namespace Application.Services.Operations.Finances.CommonForServices
{
  public interface ICommonForFinancialServices
  {
    Task<BankAccount> GetBankAccountByIdUpdateBalance(int bankId, decimal totalPriceInvoice);
    Task<FinancingAndLoanExpense> FinancingPaidOff(int financingAndLoanId);
    Task<CreditCardLimitOperation> CreditCardLimitOperationUpdateAsync(int cardId, int userId, decimal pricePaid);
   // List<CreditCardExpenseInvoiceDto> CreditCardInvoicesListMakeViaAddCreditCardExpense(CreditCardExpenseDto creditCardExpenseDto);
  }
}
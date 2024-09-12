using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.CreditCardInvoiceExpense
{
    public interface ICreditCardExpenseInvoicesRepository : IRepository<CreditCardExpenseInvoice>
    {
        void AddRangeAsync(List<CreditCardExpenseInvoice> entities);
        void UpdateRange(List<CreditCardExpenseInvoice> entities);
    }
}
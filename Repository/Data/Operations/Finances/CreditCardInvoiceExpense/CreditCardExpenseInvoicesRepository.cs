using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExpenses;

namespace Repository.Data.Operations.Finances.CreditCardInvoiceExpense
{
    public class CreditCardExpenseInvoicesRepository : Repository<CreditCardExpenseInvoice>, ICreditCardExpenseInvoicesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CreditCardExpenseInvoicesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async void AddRangeAsync(List<CreditCardExpenseInvoice> entities)
        {
            await _CONTEXT.FN_CreditCardExpensesInvoices.AddRangeAsync(entities);
        }
        public void UpdateRange(List<CreditCardExpenseInvoice> entities)
        {
            _CONTEXT.FN_CreditCardExpensesInvoices.UpdateRange(entities);
        }

    }
}
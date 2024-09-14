using System.Collections.Generic;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.CreditCardInvoiceExpense
{
    public interface ICreditCardsRepository : IRepository<Card>
    {
        void AddRangeAsync(List<Card> entities);
        void UpdateRange(List<Card> entities);
    }
}
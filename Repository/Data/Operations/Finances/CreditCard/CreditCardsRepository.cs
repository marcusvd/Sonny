using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using Domain.Entities.Finances.Bank;

namespace Repository.Data.Operations.Finances.CreditCardInvoiceExpense
{
    public class CreditCardsRepository : Repository<Card>, ICreditCardsRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CreditCardsRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async void AddRangeAsync(List<Card> entities)
        {
            await _CONTEXT.FN_Cards.AddRangeAsync(entities);
        }
        public void UpdateRange(List<Card> entities)
        {
            _CONTEXT.FN_Cards.UpdateRange(entities);
        }

    }
}
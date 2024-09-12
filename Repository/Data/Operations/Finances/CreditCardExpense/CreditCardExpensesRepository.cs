using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExpenses;

namespace Repository.Data.Operations.Finances.CreditCardExpenses
{
    public class CreditCardExpensesRepository : Repository<CreditCardExpense>, ICreditCardExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CreditCardExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async void AddRangeAsync(List<CreditCardExpense> entities)
        {
            await _CONTEXT.FN_CreditCardExpenses.AddRangeAsync(entities);
        }
        public void UpdateRange(List<CreditCardExpense> entities)
        {
            _CONTEXT.FN_CreditCardExpenses.UpdateRange(entities);
        }

    }
}
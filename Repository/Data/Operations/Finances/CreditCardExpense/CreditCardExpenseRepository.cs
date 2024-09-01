using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.CreditCardExppenses;

namespace Repository.Data.Operations.Finances.MonthlyExpenses
{
    public class CreditCardExpenseRepository : Repository<CreditCardExpense>, ICreditCardExpenseRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CreditCardExpenseRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
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
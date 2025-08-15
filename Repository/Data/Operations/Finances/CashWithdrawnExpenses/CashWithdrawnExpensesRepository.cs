using Domain.Entities.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Finances.VariablesDebitsExpenses;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;

namespace Repository.Data.Operations.Finances
{
    public class CashWithdrawnExpensesRepository : Repository<CashWithdrawnExpense>, ICashWithdrawnExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CashWithdrawnExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<CashWithdrawnExpense> entities)
        {
            await _CONTEXT.FN_CashWithdrawnExpenses.AddRangeAsync(entities);
        }

        public void UpdateRangeAsync(List<CashWithdrawnExpense> entities)
        {
            _CONTEXT.FN_CashWithdrawnExpenses.UpdateRange(entities);
        }
    }
}
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;

namespace Repository.Data.Operations.Finances.MonthlyExpenses
{
    public class MonthlyFixedExpensesRepository : Repository<MonthlyFixedExpense>, IMonthlyFixedExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public MonthlyFixedExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public void UpdateRange(List<MonthlyFixedExpense> entities)
        {
             _CONTEXT.FN_MonthlyFixedExpenses.UpdateRange(entities);
        }

    }
}
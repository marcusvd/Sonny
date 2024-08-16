using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;

namespace Repository.Data.Operations.Finances.MonthlyExpenses
{
    public class MonthFixedExpensesRepository : Repository<MonthFixedExpenses>, IMonthFixedExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public MonthFixedExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public void UpdateRange(List<MonthFixedExpenses> entities)
        {
             _CONTEXT.FN_MonthFixedExpenses.UpdateRange(entities);
        }

    }
}
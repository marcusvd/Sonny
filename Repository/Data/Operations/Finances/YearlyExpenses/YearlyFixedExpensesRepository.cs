using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.YearlyExpenses;
using System.Collections.Generic;

namespace Repository.Data.Operations.Finances.YearlyExpenses
{
    public class YearlyFixedExpensesRepository : Repository<YearlyFixedExpense>, IYearlyFixedExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public YearlyFixedExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

          public async void AddRangeAsync(List<YearlyFixedExpense> entities)
        {
            await _CONTEXT.FN_YearlyFixedExpenses.AddRangeAsync(entities);
        }

    }
}
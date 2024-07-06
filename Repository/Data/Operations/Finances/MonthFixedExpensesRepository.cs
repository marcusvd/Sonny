using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Repository.Data.Operations.Finances
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
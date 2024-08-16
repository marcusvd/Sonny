using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.YearlyExpenses;

namespace Repository.Data.Operations.Finances.YearlyExpenses
{
    public class YearlyFixedExpensesRepository : Repository<YearlyFixedExpenses>, IYearlyFixedExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public YearlyFixedExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
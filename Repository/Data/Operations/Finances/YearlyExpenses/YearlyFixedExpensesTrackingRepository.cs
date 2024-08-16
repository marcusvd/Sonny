using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.YearlyExpenses;

namespace Repository.Data.Operations.Finances.YearlyExpenses
{
    public class YearlyFixedExpensesTrackingRepository : Repository<YearlyFixedExpenseTracking>, IYearlyFixedExpensesTrackingRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public YearlyFixedExpensesTrackingRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
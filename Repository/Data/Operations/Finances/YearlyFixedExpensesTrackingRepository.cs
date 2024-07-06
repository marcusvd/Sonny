using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class YearlyFixedExpensesTrackingRepository : Repository<YearlyFixedExpensesTracking>, IYearlyFixedExpensesTrackingRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public YearlyFixedExpensesTrackingRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
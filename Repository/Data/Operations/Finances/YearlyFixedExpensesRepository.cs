using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
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
using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class MonthFixedExpensesRepository : Repository<MonthFixedExpenses>, IMonthFixedExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public MonthFixedExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
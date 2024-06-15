using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class MonthFixedExpensesFillersRepository : Repository<MonthFixedExpensesFillers>, IMonthFixedExpensesFillersRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public MonthFixedExpensesFillersRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
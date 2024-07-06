using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class YearlyFixedExpensesFillersRepository : Repository<YearlyFixedExpensesFillers>, IYearlyFixedExpensesFillersRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public YearlyFixedExpensesFillersRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
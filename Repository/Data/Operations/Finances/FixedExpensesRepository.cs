using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FixedExpensesRepository : Repository<FixedExpenses>, IFixedExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FixedExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
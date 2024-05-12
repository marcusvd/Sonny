using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class ExpensesRepository : Repository<Expenses>, IExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
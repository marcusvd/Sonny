using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class ExpensesNotPredictableRepository : Repository<ExpensesNotPredictable>, IExpensesNotPredictableRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ExpensesNotPredictableRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
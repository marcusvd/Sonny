using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class VariableExpensesRepository : Repository<VariableExpenses>, IVariableExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public VariableExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
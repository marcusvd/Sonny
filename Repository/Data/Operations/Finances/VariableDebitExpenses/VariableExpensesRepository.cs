using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.VariableDebitExpenses;
using Repository.Data.Operations.Finances.VariableDebitExpenses;

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
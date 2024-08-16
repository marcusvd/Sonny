using Domain.Entities.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Finances.VariablesDebitsExpenses;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class VariablesExpensesRepository : Repository<VariableExpense>, IVariablesExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public VariablesExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
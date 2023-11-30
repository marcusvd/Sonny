using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FinancialExpensesRepository : Repository<FinancialExpenses>, IFinancialExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancialExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
using Domain.Entities.Finances;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FinancialEssentialExpensesRepository : Repository<FinancialEssentialExpenses>, IFinancialEssentialExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancialEssentialExpensesRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}

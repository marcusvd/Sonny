using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FinancialExpensesNotPredictableRepository : Repository<FinancialExpensesNotPredictable>, IFinancialExpensesNotPredictableRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancialExpensesNotPredictableRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FinancialNotPredictableRepository : Repository<FinancialNotPredictable>, IFinancialNotPredictableRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancialNotPredictableRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
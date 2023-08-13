using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FinancialBillToPayListRepository : Repository<FinancialBillToPayList>, IFinancialBillToPayListRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancialBillToPayListRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
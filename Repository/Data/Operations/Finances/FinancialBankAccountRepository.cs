using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FinancialBankAccountRepository : Repository<FinancialBankAccount>, IFinancialBankAccountRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancialBankAccountRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
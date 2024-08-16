using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.Bank;

namespace Repository.Data.Operations.Finances
{
    public class BankAccountRepository : Repository<BankAccount>, IBankAccountRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public BankAccountRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
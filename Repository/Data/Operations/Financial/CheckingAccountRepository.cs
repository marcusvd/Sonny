using Repository.Data.Context;
using Domain.Entities.Financial;
using Repository.Data.Contracts.Financial;
namespace Repository.Data.Operations.Financial
{
    public class CheckingAccountRepository : Repository<CheckingAccount>, ICheckingAccountRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CheckingAccountRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.Bank;
using System.Collections.Generic;

namespace Repository.Data.Operations.Finances
{
    public class BankAccountRepository : Repository<BankAccount>, IBankAccountRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public BankAccountRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
         public async void AddRangeAsync(List<BankAccount> entities)
        {
            await _CONTEXT.FN_BankAccount.AddRangeAsync(entities);
        }
         public void UpdateRange(List<BankAccount> entities)
        {
             _CONTEXT.FN_BankAccount.UpdateRange(entities);
        }
    }
}

using System.Collections.Generic;
using Domain.Entities.Finances.Bank;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public interface IBankAccountRepository : IRepository<BankAccount>
    {
         void AddRangeAsync(List<BankAccount> entities);
    }
}
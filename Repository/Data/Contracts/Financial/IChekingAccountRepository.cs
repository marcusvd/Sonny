using Domain.Entities;
using Domain.Entities.Financial;
using Repository.Contracts;

namespace Repository.Data.Contracts.Financial
{
    public interface ICheckingAccountRepository : IRepository<CheckingAccount>
    {

        // Task<CheckingAccount[]> GetAll(bool include = false);
        // Task<CheckingAccount> GetByIdAsync(int Id, bool include = false);
    }
}
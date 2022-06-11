using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ICheckingAccountRepository : IRepository<CheckingAccount>
    {

        // Task<CheckingAccount[]> GetAll(bool include = false);
        // Task<CheckingAccount> GetByIdAsync(int Id, bool include = false);
    }
}
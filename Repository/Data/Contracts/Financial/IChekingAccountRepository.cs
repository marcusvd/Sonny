using Domain.Entities.Financial;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Contracts.Financial
{
    public interface ICheckingAccountRepository : IRepository<CheckingAccount>
    {
    }
}
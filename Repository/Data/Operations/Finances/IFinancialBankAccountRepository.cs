using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public interface IFinancialBankAccountRepository : IRepository<FinancialBankAccount>
    {
    }
}
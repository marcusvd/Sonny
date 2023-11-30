using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public interface IFinancialExpensesRepository : IRepository<FinancialExpenses>
    {
    }
}
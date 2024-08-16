using Domain.Entities.Finances;
using Domain.Entities.Finances.FinancingLoansExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.FinancingLoansExpenses
{
    public interface IFinancingAndLoansExpensesRepository : IRepository<FinancingAndLoansExpenses>
    {
    }
}
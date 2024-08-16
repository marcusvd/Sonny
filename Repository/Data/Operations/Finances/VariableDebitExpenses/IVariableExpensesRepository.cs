using Domain.Entities.Finances;
using Domain.Entities.Finances.VariableDebitExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.VariableDebitExpenses
{
    public interface IVariableExpensesRepository : IRepository<VariableExpenses>
    {
    }
}
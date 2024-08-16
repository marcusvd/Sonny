using Domain.Entities.Finances;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.VariablesDebitsExpenses
{
    public interface IVariablesExpensesRepository : IRepository<VariableExpense>
    {
    }
}
using Domain.Entities.Finances;
using Domain.Entities.Finances.YearlyExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.YearlyExpenses
{
    public interface IYearlyFixedExpensesRepository : IRepository<YearlyFixedExpense>
    {
    }
}
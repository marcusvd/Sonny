using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.MonthlyExpenses
{
    public interface IMonthlyFixedExpensesRepository : IRepository<MonthlyFixedExpense>
    {
        void UpdateRange(List<MonthlyFixedExpense> entities);
    }
}
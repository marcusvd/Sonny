using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.MonthlyExpenses
{
    public interface IMonthFixedExpensesRepository : IRepository<MonthFixedExpenses>
    {
        void UpdateRange(List<MonthFixedExpenses> entities);
    }
}
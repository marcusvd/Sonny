using System.Collections.Generic;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public interface IMonthFixedExpensesRepository : IRepository<MonthFixedExpenses>
    {
        void UpdateRange(List<MonthFixedExpenses> entities);
    }
}
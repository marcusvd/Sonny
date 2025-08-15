using System.Collections.Generic;
using Domain.Entities.Finances;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.VariablesDebitsExpenses
{
    public interface ICashWithdrawnExpensesRepository : IRepository<CashWithdrawnExpense>
    {
        void AddRangeAsync(List<CashWithdrawnExpense> entities);
        void UpdateRangeAsync(List<CashWithdrawnExpense> entities);
    }
}
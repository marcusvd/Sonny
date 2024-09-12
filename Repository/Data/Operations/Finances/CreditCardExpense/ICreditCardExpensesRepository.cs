using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.CreditCardExpenses
{
    public interface ICreditCardExpensesRepository : IRepository<CreditCardExpense>
    {
        void AddRangeAsync(List<CreditCardExpense> entities);
        void UpdateRange(List<CreditCardExpense> entities);
    }
}
using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExppenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.MonthlyExpenses
{
    public interface ICreditCardExpenseRepository : IRepository<CreditCardExpense>
    {
        void AddRangeAsync(List<CreditCardExpense> entities);
        void UpdateRange(List<CreditCardExpense> entities);
    }
}
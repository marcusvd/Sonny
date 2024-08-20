using System.Collections.Generic;
using Domain.Entities.Finances;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.FinancingsLoansExpenses
{
    public interface IFinancingsAndLoansExpensesRepository : IRepository<FinancingAndLoanExpense>
    {
          void AddRangeAsync(List<FinancingAndLoanExpense> entities);
    }
}
using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using System.Collections.Generic;

namespace Repository.Data.Operations.Finances.FinancingsLoansExpenses
{
    public class FinancingsAndLoansExpensesRepository : Repository<FinancingAndLoanExpense>, IFinancingsAndLoansExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancingsAndLoansExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<FinancingAndLoanExpense> entities)
        {
            await _CONTEXT.FN_FinancingsAndLoansExpenses.AddRangeAsync(entities);
        }
    }
}
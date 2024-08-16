using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.FinancingsLoansExpenses;

namespace Repository.Data.Operations.Finances.FinancingsLoansExpenses
{
    public class FinancingsAndLoansExpensesTrackingRepository : Repository<FinancingAndLoanExpenseTracking>, IFinancingsAndLoansExpensesTrackingRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancingsAndLoansExpensesTrackingRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.FinancingLoansExpenses;

namespace Repository.Data.Operations.Finances.FinancingLoansExpenses
{
    public class FinancingAndLoansExpensesTrackingRepository : Repository<FinancingAndLoansExpensesTracking>, IFinancingAndLoansExpensesTrackingRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancingAndLoansExpensesTrackingRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
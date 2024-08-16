using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.FinancingLoansExpenses;

namespace Repository.Data.Operations.Finances.FinancingLoansExpenses
{
    public class FinancingAndLoansExpensesRepository : Repository<FinancingAndLoansExpenses>, IFinancingAndLoansExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancingAndLoansExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
using Repository.Data.Context;
using Domain.Entities.Financial;
using Repository.Data.Contracts.Financial;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Financial
{
    public class FinancingLoanRepository : Repository<FinancingLoan>, IFinancingLoanRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancingLoanRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}
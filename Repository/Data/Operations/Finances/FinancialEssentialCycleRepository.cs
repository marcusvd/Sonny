using Domain.Entities.Finances;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class FinancialEssentialCycleRepository : Repository<FinancialEssentialCycle>, IFinancialEssentialCycleRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public FinancialEssentialCycleRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}

//   public class TypePaymentRepository : Repository<TypePayment>, ITypePaymentRepository
    // {
    //     private readonly SonnyDbContext _CONTEXT;
    //     public TypePaymentRepository(SonnyDbContext CONTEXT):base(CONTEXT)
    //     {
    //         _CONTEXT = CONTEXT;
    //     }
    // }
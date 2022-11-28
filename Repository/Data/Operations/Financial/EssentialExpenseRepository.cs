using Domain.Entities;
using Domain.Entities.Financial;
using Repository.Data.Context;
using Repository.Data.Contracts.Financial;

namespace Repository.Data.Operations.Financial
{
    public class EssentialExpenseRepository : Repository<EssentialExpense>, IEssentialExpenseRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public EssentialExpenseRepository(SonnyDbContext CONTEXT):base(CONTEXT)
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
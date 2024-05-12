using Domain.Entities.Finances;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public class EssentialExpensesRepository : Repository<EssentialExpenses>, IEssentialExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public EssentialExpensesRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}

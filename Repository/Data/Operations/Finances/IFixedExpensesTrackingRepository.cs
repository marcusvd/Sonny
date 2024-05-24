using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public interface IFixedExpensesTrackingRepository : IRepository<FixedExpensesTracking>
    {
        void FillFixedExpensesTracking(int companyId);
    }
}
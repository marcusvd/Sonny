using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public interface IYearlyFixedExpensesTrackingRepository : IRepository<YearlyFixedExpensesTracking>
    {
       // void FillFixedExpensesTracking(int companyId);
    }
}
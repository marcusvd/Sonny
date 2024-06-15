using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances
{
    public interface IMonthFixedExpensesTrackingRepository : IRepository<MonthFixedExpensesTracking>
    {
       // void FillFixedExpensesTracking(int companyId);
    }
}
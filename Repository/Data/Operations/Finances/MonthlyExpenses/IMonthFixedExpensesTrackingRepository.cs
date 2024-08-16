using Domain.Entities.Finances;
using Domain.Entities.Finances.MonthlyExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.MonthlyExpenses
{
    public interface IMonthFixedExpensesTrackingRepository : IRepository<MonthFixedExpensesTracking>
    {
       // void FillFixedExpensesTracking(int companyId);
    }
}

using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.MonthlyExpenses
{
    public class MonthFixedExpensesTracking : BaseExpensesTracking
    {
        public int MonthFixedExpensesId { get; set; }
        public MonthFixedExpenses MonthFixedExpenses { get; set; }
    }
}
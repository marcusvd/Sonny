
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.MonthlyExpenses
{
    public class MonthlyFixedExpenseTracking : BaseExpenseTracking
    {
        public int MonthlyFixedExpenseId { get; set; }
        public MonthlyFixedExpense MonthlyFixedExpense { get; set; }
    }
}
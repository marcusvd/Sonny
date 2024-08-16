using System;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.YearlyExpenses
{
    public class YearlyFixedExpenseTracking : BaseExpenseTracking
    {
        public int YearlyFixedExpenseId { get; set; }
        public YearlyFixedExpense YearlyFixedExpense { get; set; }  
        public DateTime Start { get; set; }

    }
}
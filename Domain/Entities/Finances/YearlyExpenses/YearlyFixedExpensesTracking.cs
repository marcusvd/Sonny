using System;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.YearlyExpenses
{
    public class YearlyFixedExpensesTracking : BaseExpensesTracking
    {
        public int YearlyFixedExpensesId { get; set; }
        public YearlyFixedExpenses YearlyFixedExpenses { get; set; }  
        public DateTime Start { get; set; }

    }
}
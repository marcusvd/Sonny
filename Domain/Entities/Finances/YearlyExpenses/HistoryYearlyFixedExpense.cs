using System;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.YearlyExpenses
{
    public class HistoryYearlyFixedExpense : BaseHistoryExpense
    {
        public DateTime Start { get; set; }
        public bool AutoRenew { get; set; }
    }
}
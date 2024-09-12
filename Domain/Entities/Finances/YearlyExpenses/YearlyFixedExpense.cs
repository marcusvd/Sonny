using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.YearlyExpenses
{
    public class YearlyFixedExpense : BaseExpense
    {
        public DateTime Start { get; set; }
        public bool AutoRenew { get; set; }
    }
}
using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.YearlyExpenses
{
    public class YearlyFixedExpense : BaseExpense
    {
       
        public DateTime Start { get; set; }
        public bool AutoRenew { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<YearlyFixedExpenseTracking> YearlyFixedExpensesTrackings { get; set; }

    }
}
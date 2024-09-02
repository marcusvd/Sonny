using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.MonthlyExpenses
{
    public class MonthlyFixedExpense : BaseExpense
    {
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
    }
}
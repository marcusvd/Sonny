using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseInstallment : BaseExpenseInstallment
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }

    }
}
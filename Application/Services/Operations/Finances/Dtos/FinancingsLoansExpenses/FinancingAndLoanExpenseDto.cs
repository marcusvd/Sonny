using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Inheritance;

namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseDto : BaseExpenseDto
    {
       
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int InstallmentNumber { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<FinancingAndLoanExpenseTrackingDto> FinancingAndLoansExpensesTrackings { get; set; }

    }
}
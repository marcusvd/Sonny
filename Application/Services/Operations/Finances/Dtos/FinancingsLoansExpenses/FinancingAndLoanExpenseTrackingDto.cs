using System;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;


namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseTrackingDto 
    {
        public int FinancingAndLoanExpenseId { get; set; }
        public FinancingAndLoanExpenseDto FinancingAndLoanExpense { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int InstallmentNumber { get; set; }
    }
}
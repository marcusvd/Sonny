using System;
using Application.Services.Operations.Finances.Dtos.Inheritance;


namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseTrackingDto : BaseExpenseTrackingDto
    {
        public int FinancingAndLoanExpenseId { get; set; }
        public FinancingAndLoanExpenseDto FinancingAndLoanExpense { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int installmentNumber { get; set; }
    }
}
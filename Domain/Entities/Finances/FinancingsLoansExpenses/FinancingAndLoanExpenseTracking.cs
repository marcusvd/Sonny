using System;
using Domain.Entities.Finances.Inheritance;


namespace Domain.Entities.Finances.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseTracking : BaseExpenseTracking
    {
        public int FinancingAndLoanExpenseId { get; set; }
        public FinancingAndLoanExpense FinancingAndLoanExpense { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int installmentNumber { get; set; }
    }
}
using System;
using Domain.Entities.Finances.Inheritance;


namespace Domain.Entities.Finances.FinancingLoansExpenses
{
    public class FinancingAndLoansExpensesTracking : BaseExpensesTracking
    {
        public int FinancingAndLoansExpensesId { get; set; }
        public FinancingAndLoansExpenses FinancingAndLoansExpenses { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int installmentNumber { get; set; }
    }
}
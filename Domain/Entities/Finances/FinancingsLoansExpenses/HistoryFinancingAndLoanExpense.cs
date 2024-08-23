using System;
using Domain.Entities.Finances.Inheritance;


namespace Domain.Entities.Finances.FinancingsLoansExpenses
{
    public class HistoryFinancingAndLoanExpense : BaseHistoryExpense
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
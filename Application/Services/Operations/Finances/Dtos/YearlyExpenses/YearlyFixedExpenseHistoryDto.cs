using System;


namespace Application.Services.Operations.Finances.Dtos.YearlyExpenses
{
    public class YearlyFixedExpenseHistoryDto 
    {
        public int YearlyFixedExpenseId { get; set; }
        public YearlyFixedExpenseDto YearlyFixedExpense { get; set; }
        public DateTime Start { get; set; }
        public DateTime Expiration { get; set; }
    }
}
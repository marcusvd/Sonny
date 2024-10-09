
using System;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;

namespace Domain.Entities.Finances.PixExpenses
{
    public class PixExpense
    {
        public int Id { get; set; }
        public int PixOutId { get; set; }
        public Pix PixOut { get; set; }
        public string BenefitedName { get; set; }
        public string BenefitedKey { get; set; }
        public DateTime ExpenseDay { get; set; }
        public bool Deleted { get; set; }
        public DateTime Registered { get; set; }
        public int? MonthlyFixedExpenseId { get; set; } = null;
        public MonthlyFixedExpense MonthlyFixedExpense { get; set; }
        public int? YearlyFixedExpenseId { get; set; } = null;
        public YearlyFixedExpense YearlyFixedExpense { get; set; }
        public int? VariableExpenseId { get; set; } = null;
        public VariableExpense VariableExpense { get; set; }
        public int? FinancingAndLoanExpenseId { get; set; } = null;
        public FinancingAndLoanExpense FinancingAndLoanExpense { get; set; }
       public string Description { get; set; }

    }
}
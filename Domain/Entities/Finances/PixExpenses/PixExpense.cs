
using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.PixExpenses
{
    public class PixExpense : RootBase
    {
        public int PixOutId { get; set; }
        public Pix PixOut { get; set; }
        public string BenefitedName { get; set; }
        public string BenefitedKey { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime ExpenseDay { get; set; }
        public int? MonthlyFixedExpenseId { get; set; } = null;
        public MonthlyFixedExpense MonthlyFixedExpense { get; set; }
        public int? YearlyFixedExpenseId { get; set; } = null;
        public YearlyFixedExpense YearlyFixedExpense { get; set; }
        public int? CashWithdrawnExpenseId { get; set; } = null;
        public CashWithdrawnExpense CashWithdrawnExpense { get; set; }
        public int? FinancingAndLoanExpenseId { get; set; } = null;
        public FinancingAndLoanExpense FinancingAndLoanExpense { get; set; }
        public string Description { get; set; }

    }
}

using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Finances.Dtos.PixExpenses
{
    public class PixExpenseDto:RootBaseDto
    {
        public int PixOutId { get; set; }
        public PixDto PixOut { get; set; }
        public int BankAccountId { get; set; }
        public string BenefitedName { get; set; }
        public string BenefitedKey { get; set; }
        public decimal Price { get; set; }
        public DateTime ExpenseDay { get; set; }
        public int? MonthlyFixedExpenseId { get; set; }
        // public MonthlyFixedExpenseDto MonthlyFixedExpense { get; set; }
        public int? YearlyFixedExpenseId { get; set; }
        // public YearlyFixedExpenseDto YearlyFixedExpense { get; set; }
        public int? VariableExpenseId { get; set; }
        // public VariableExpenseDto VariableExpense { get; set; }
        public int? FinancingAndLoanExpenseId { get; set; }
        // public FinancingAndLoanExpenseDto FinancingAndLoanExpense { get; set; }
        public string Description { get; set; }
    }
}
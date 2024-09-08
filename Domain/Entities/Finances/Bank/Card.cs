using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;


namespace Domain.Entities.Finances.Bank
{
    public class Card
    {
        public int Id { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public decimal Limit { get; set; }
        public TypeCardEnum Type { get; set; }
        public string Number { get; set; }
        public int CVC { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
        public DateTime ClosingDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public bool Deleted { get; set; }
        public int BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public List<MonthlyFixedExpenseInstallment> MonthlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpenseInstallment> FinancingsAndLoansExpenses { get; set; }
        public List<YearlyFixedExpenseInstallment> YearlyFixedExpenses { get; set; }
        public List<VariableExpense> VariablesExpenses { get; set; }

    }
}


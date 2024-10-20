using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;


namespace Domain.Entities.Finances.Bank
{
    public class Card
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public decimal CreditLimit { get; set; }
        public TypeCardEnum Type { get; set; }
        public string Number { get; set; }
        public int CVC { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
        public DateTime ClosingDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public bool Deleted { get; set; }
        public DateTime Registered { get; set; }
        public CreditCardLimitOperation CreditCardLimitOperation { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public List<MonthlyFixedExpense> MonthlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpenseInstallment> FinancingsAndLoansExpensesInstallments { get; set; }
        public List<YearlyFixedExpense> YearlyFixedExpenses { get; set; }
        public List<VariableExpense> VariablesExpenses { get; set; }
        public List<CreditCardExpenseInvoice> CreditCardExpensesInvoices { get; set; }

    }
}


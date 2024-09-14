using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Authentication;
using System;

namespace Domain.Entities.Finances.Bank
{
    public class BankAccount
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string Holder { get; set; }
        public string Institution { get; set; }
        public string Account { get; set; }
        public string Agency { get; set; }
        public string ManagerName { get; set; }
        public string ManagerContact { get; set; }
        public decimal Balance { get; set; }
        public string Description { get; set; }
        public bool Deleted { get; set; }
        public DateTime Registered { get; set; }
        public TypeAccountEnum Type { get; set; }
        public List<Card> Cards { get; set; }
        public List<Pix> Pixes { get; set; }
        public List<VariableExpense> VariablesExpenses { get; set; }
        public List<MonthlyFixedExpense> MonthlyFixedExpenses { get; set; }
        public List<YearlyFixedExpense> YearlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpense> FinancingsLoansExpenses { get; set; }
        public List<CreditCardExpense> CreditCardExpenses { get; set; }
        //public List<CreditCardExpenseInvoice> CreditCardExpensesInvoices { get; set; }

    }

}
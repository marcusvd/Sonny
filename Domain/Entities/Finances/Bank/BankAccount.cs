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
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.Bank
{
    public class BankAccount : RootBase
    {
        
        public string Holder { get; set; }
        public string Institution { get; set; }
        public string Account { get; set; }
        public string Agency { get; set; }
        public string ManagerName { get; set; }
        public string ManagerContact { get; set; }
        public decimal Balance { get; set; }
        public string Description { get; set; }
        public TypeAccountEnum Type { get; set; }
        public List<Card> Cards { get; set; }
        public List<Pix> Pixes { get; set; }
        public List<CashWithdrawnExpense> CashWithdrawnExpenses { get; set; }
        public List<MonthlyFixedExpense> MonthlyFixedExpenses { get; set; }
        public List<YearlyFixedExpense> YearlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpenseInstallment> FinancingsAndLoansExpensesInstallments { get; set; }
        // public List<CreditCardExpense> CreditCardExpenses { get; set; }
        public List<CreditCardExpenseInvoice> PaidCreditCardExpensesInvoices { get; set; }

    }

}
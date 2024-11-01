using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.CreditCardExpenses
{
    public class CreditCardExpense : RootBase
    {

        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpense SubcategoryExpense { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; }
        public decimal Price { get; set; }
        public DateTime Expires { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
        public int InstallmentsQuantity { get; set; }
        public decimal InstallmentPrice { get; set; }
        public decimal TotalPriceInterest { get; set; }
        public decimal TotalPercentageInterest { get; set; }
        public decimal PaymentAtSight { get; set; }
        public string CurrentInstallment { get; set; }
        public DateTime ExpenseDay { get; set; }
        public int CreditCardExpenseInvoiceId { get; set; }
        public CreditCardExpenseInvoice CreditCardExpenseInvoice { get; set; }
        public int? MonthlyFixedExpenseId { get; set; } = null;
        public MonthlyFixedExpense MonthlyFixedExpense { get; set; }
        public int? YearlyFixedExpenseId { get; set; } = null;
        public YearlyFixedExpense YearlyFixedExpense { get; set; }
        public int? VariableExpenseId { get; set; } = null;
        public VariableExpense VariableExpense { get; set; }
        public int? FinancingAndLoanExpenseId { get; set; } = null;
        public FinancingAndLoanExpense FinancingAndLoanExpense { get; set; }
    }
}

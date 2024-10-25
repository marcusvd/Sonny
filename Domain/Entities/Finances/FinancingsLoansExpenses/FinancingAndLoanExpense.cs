using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpense : RootBase
    {
        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public SubcategoryExpense SubcategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public decimal TotalPriceToBePaid { get; set; }
        public decimal TotalPriceFinancingOrLoan { get; set; }
        public decimal TotalPriceInterest { get; set; }
        public decimal TotalPercentageInterest { get; set; }
        public int InstallmentsQuantity { get; set; }
        public decimal InstallmentPrice { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime PaidOff { get; set; }
        public string Description { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<FinancingAndLoanExpenseInstallment> FinancingsAndLoansExpensesInstallments { get; set; }
    }
}
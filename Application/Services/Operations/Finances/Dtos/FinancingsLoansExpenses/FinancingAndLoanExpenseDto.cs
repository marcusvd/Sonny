using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseDto : RootBaseDto
    {

        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpenseDto CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpenseDto SubcategoryExpense { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public decimal TotalPriceFinancingOrLoan { get; set; }
        public decimal TotalPriceToBePaid { get; set; }
        public decimal TotalPriceInterest { get; set; }
        public decimal TotalPercentageInterest { get; set; }
        public decimal InstallmentPrice { get; set; }
        public int InstallmentsQuantity { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime PaidOff { get; set; }
        public string Description { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<FinancingAndLoanExpenseInstallmentDto> FinancingsAndLoansExpensesInstallments { get; set; }
    }
}
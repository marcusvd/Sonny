using System;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseDto:RootBaseDto
    {
        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpenseDto CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpenseDto SubcategoryExpense { get; set; }
        public int? PaidFromBankAccountId { get; set; }
        public BankAccountDto PaidFromBankAccount { get; set; }
        public int CardId { get; set; }
        public CardDto Card { get; set; }
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
        public CreditCardLimitOperationDto CreditCardLimitOperation { get; set; }
        public int? CreditCardExpenseInvoiceId { get; set; }
        public CreditCardExpenseInvoiceDto CreditCardExpenseInvoice { get; set; }
    }
}

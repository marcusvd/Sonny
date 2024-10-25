using System;

using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Application.Services.Shared.Dtos;


namespace Application.Services.Operations.Finances.Dtos.InheritanceDto
{
    public class BaseExpenseDto : RootBaseDto
    {

        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpenseDto CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpenseDto SubcategoryExpense { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
        public int? CardId { get; set; }
        public CardDto Card { get; set; }
        public int? PixId { get; set; }
        public PixDto Pix { get; set; }
        public PixExpenseDto PixExpense { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
    }
}
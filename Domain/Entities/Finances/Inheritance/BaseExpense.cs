using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.Inheritance
{
    public class BaseExpense : RootBase

    {
  
        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpense SubcategoryExpense { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public int? CardId { get; set; }
        public Card Card { get; set; }
        public int? PixId { get; set; }
        public Pix Pix { get; set; }
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
using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.Inheritance
{
    public class BaseExpense
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpense SubcategoryExpense { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public bool Deleted { get; set; }
        public int? CardId { get; set; }
        public Card Card { get; set; }
        public int? PixId { get; set; }
        public Pix Pix { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Registered { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
     
    }
}
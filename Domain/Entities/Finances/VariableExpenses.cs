using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;

namespace Domain.Entities.Finances
{
    public class VariableExpenses
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int CategoryExpensesId { get; set; }
        public CategoryExpenses CategoryExpenses { get; set; }
        public int SubcategoryExpensesId { get; set; }
        public SubcategoryExpenses SubcategoryExpenses { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public int? CardId { get; set; }
        public Card Card { get; set; }
        public int? PixId { get; set; }
        public Pix Pix { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Item { get; set; }
        public string Place { get; set; }
        public DateTime PaidDay { get; set; }
        public DateTime Registerd { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public bool Deleted { get; set; }

    }
}
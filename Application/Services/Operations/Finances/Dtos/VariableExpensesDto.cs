using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class VariableExpensesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int CategoryExpensesId { get; set; }
        public CategoryExpensesDto CategoryExpenses { get; set; }
        public int SubcategoryExpensesId { get; set; }
        public SubcategoryExpensesDto SubcategoryExpenses { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
        public int? CardId { get; set; }
        public CardDto Card { get; set; }
        public int? PixId { get; set; }
        public PixDto Pix { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Item { get; set; }
        public string Place { get; set; }
        public DateTime PaidDay { get; set; }
        public DateTime Registered { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public bool Deleted { get; set; }
    }
}
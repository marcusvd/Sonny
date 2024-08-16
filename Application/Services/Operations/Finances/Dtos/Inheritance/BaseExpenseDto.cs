using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos.Inheritance
{
    public abstract class BaseExpenseDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int? UserId { get; set; }
        public MyUserDto User { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpenseDto CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpenseDto SubcategoryExpense { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Registered { get; set; }
        public bool Deleted { get; set; }
    }
}
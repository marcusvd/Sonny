using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.Inheritance
{
    public abstract class BaseExpense
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpense SubcategoryExpense { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Registered { get; set; }
        public bool Deleted { get; set; }
    }
}
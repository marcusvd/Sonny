using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.Inheritance
{
    public abstract class BaseExpenses
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int CategoryExpensesId { get; set; }
        public CategoryExpenses CategoryExpenses { get; set; }
        public int SubcategoryExpensesId { get; set; }
        public SubcategoryExpenses SubcategoryExpenses { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Registered { get; set; }
        public bool Deleted { get; set; }
    }
}
using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Inheritance;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class VariableExpenseDto : BaseExpenseTrackingDto
    {
        public int CategoryExpensesId { get; set; }
        public CategoryExpenseDto CategoryExpenses { get; set; }
        public int SubcategoryExpensesId { get; set; }
        public SubcategoryExpenseDto SubcategoryExpenses { get; set; }
        public string Item { get; set; }
        public string Place { get; set; }
        public string Description { get; set; }
    }
}
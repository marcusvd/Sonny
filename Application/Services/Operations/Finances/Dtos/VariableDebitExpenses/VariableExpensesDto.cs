using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Inheritance;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class VariableExpensesDto : BaseExpensesTrackingDto
    {
        public int CategoryExpensesId { get; set; }
        public CategoryExpensesDto CategoryExpenses { get; set; }
        public int SubcategoryExpensesId { get; set; }
        public SubcategoryExpensesDto SubcategoryExpenses { get; set; }
        public string Item { get; set; }
        public string Place { get; set; }
        public string Description { get; set; }
    }
}
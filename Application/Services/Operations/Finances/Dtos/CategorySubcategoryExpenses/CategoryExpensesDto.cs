using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses
{
    public class CategoryExpensesDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public List<MonthFixedExpensesDto> MonthFixedExpenses { get; set; }
        public List<YearlyFixedExpensesDto> YearlyFixedExpenses { get; set; }
        public List<SubcategoryExpensesDto> SubcategoriesExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}
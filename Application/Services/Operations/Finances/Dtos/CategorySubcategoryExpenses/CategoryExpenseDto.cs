using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses
{
    public class CategoryExpenseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public PayCycleEnumDto PayCycle {get; set;}
        public List<MonthlyFixedExpenseDto> MonthlyFixedExpenses { get; set; }
        public List<YearlyFixedExpenseDto> YearlyFixedExpenses { get; set; }
        public List<SubcategoryExpenseDto> SubcategoriesExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}
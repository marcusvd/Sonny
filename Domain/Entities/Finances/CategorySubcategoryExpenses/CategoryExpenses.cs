
using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariableDebitExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.CategorySubcategoryExpenses
{
    public class CategoryExpenses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public List<MonthFixedExpenses> MonthFixedExpenses { get; set; }
        public List<YearlyFixedExpenses> YearlyFixedExpenses { get; set; }
        public List<SubcategoryExpenses> SubcategoriesExpenses { get; set; }
        public List<VariableExpenses> VariableExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}

using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
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
        public bool Deleted { get; set; }
    }
}

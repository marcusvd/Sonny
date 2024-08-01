using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class SubcategoryExpenses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryExpensesId { get; set; }
        public CategoryExpenses CategoryExpenses { get; set; }
        public List<MonthFixedExpenses> MonthFixedExpenses { get; set; }
        public List<YearlyFixedExpenses> YearlyFixedExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}

using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;

namespace Domain.Entities.Finances.CategorySubcategoryExpenses
{
    public class SubcategoryExpense
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public List<MonthlyFixedExpense> MonthlyFixedExpenses { get; set; }
        public List<YearlyFixedExpense> YearlyFixedExpenses { get; set; }
        public List<VariableExpense> VariablesExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}

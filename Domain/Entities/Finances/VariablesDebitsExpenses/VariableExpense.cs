using System;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.VariablesDebitsExpenses
{
    public class VariableExpense : BaseExpenseTracking
    {
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpense SubcategoryExpense { get; set; }
        public string Item { get; set; }
        public string Place { get; set; }
        public DateTime PaidDay { get; set; }
        public DateTime Registerd { get; set; }
    }
}
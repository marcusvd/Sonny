using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;

namespace Domain.Entities.Finances.VariableDebitExpenses
{
    public class VariableExpenses : BaseExpensesTracking
    {
        public int CategoryExpensesId { get; set; }
        public CategoryExpenses CategoryExpenses { get; set; }
        public int SubcategoryExpensesId { get; set; }
        public SubcategoryExpenses SubcategoryExpenses { get; set; }
        public string Item { get; set; }
        public string Place { get; set; }
        public DateTime PaidDay { get; set; }
        public DateTime Registerd { get; set; }
    }
}
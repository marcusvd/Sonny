using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Finances.PixExpenses;
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.VariablesDebitsExpenses
{
    public class CashWithdrawnExpense : RootBase
    {


        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public SubcategoryExpense SubcategoryExpense { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public decimal Price { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
        public DateTime WithdrawnOn { get; set; }
        public string Place { get; set; }
        public List<CreditCardExpense> PaymentsByCreditCards { get; set; }
        public List<PixExpense> PaymentsByPixExpenses { get; set; }
    }
}
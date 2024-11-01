using System;
using System.Collections.Generic;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Finances.PixExpenses;

namespace Domain.Entities.Finances.VariablesDebitsExpenses
{
    public class VariableExpense : BaseExpense
    {
        public string Place { get; set; }
        public List<CreditCardExpense> PaymentsByCreditCards{ get; set; }
        public List<PixExpense> PaymentsByPixExpenses{ get; set; }
    }
}
using System;
using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Finances.PixExpenses;

namespace Domain.Entities.Finances.YearlyExpenses
{
    public class YearlyFixedExpense : BaseExpense
    {
        public DateTime Start { get; set; }
        public bool AutoRenew { get; set; }
        public List<CreditCardExpense> PaymentsByCreditCards{ get; set; }
        public List<PixExpense> PaymentsByPixExpenses{ get; set; }
    }
}
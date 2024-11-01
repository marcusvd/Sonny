using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Finances.PixExpenses;


namespace Domain.Entities.Finances.MonthlyExpenses
{
    public class MonthlyFixedExpense : BaseExpense
    {
        public List<CreditCardExpense> PaymentsByCreditCards{ get; set; }
        public List<PixExpense> PaymentsByPixExpenses{ get; set; }
    }
}
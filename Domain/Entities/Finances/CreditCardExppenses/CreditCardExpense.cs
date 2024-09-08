using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.CreditCardExppenses
{
    public class CreditCardExpense : BaseExpense
    {
        public List<CreditCardExpenseInstallment> CreditCardExpensesInstallments { get; set; }
    }
}

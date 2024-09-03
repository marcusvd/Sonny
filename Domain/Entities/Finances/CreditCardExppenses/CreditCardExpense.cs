
using System;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.CreditCardExppenses
{
    public class CreditCardExpense : BaseExpense
    {
        public int InstallmentNumber { get; set; }
        public DateTime ExpenseDay { get; set; }

    }
}

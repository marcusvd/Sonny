
using System;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.CreditCardExppenses
{
    public class CreditCardExpenseInstallment : BaseExpenseInstallment
    {
        public int CreditCardExpenseId {get; set;}
        public CreditCardExpense CreditCardExpense {get; set;}
        public int InstallmentNumber { get; set; }
        public DateTime ExpenseDay { get; set; }

    }
}

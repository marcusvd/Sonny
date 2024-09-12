using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.CreditCardExpenses
{
    public class CreditCardExpense : BaseExpense
    {
        public int InstallmentNumber { get; set; }
        public DateTime ExpenseDay { get; set; }
        public int CreditCardExpenseInvoiceId { get; set; }
        public CreditCardExpenseInvoice CreditCardExpenseInvoice { get; set; }
    }
}

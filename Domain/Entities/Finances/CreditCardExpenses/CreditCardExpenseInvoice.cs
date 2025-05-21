
using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.CreditCardExpenses
{
    public class CreditCardExpenseInvoice : RootBase
    {

        public int? CardId { get; set; }
        public Card Card { get; set; }
        public int? PaidFromBankAccountId { get; set; }
        public BankAccount PaidFromBankAccount { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime ClosingDate { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
        public List<CreditCardExpense> CreditCardExpenses { get; set; }


    }
}

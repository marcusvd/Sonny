
using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.CreditCardExpenses
{
    public class CreditCardExpenseInvoice
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int? CardId { get; set; }
        public Card Card { get; set; }
        public decimal AmountPrice { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
        public DateTime Registered { get; set; }
        public bool Deleted { get; set; }
        public List<CreditCardExpense> CreditCardExpenses { get; set; }

    }
}

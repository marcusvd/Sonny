using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.Inheritance
{
    public abstract class BaseExpensesTracking
    {
      public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int? UserId { get; set; }
        public MyUser User { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public int? CardId { get; set; }
        public Card Card { get; set; }
        public int? PixId { get; set; }
        public Pix Pix { get; set; }
        public string OthersPaymentMethods { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Registered { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public bool Deleted { get; set; }
    }
}
using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class MonthFixedExpensesTracking
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int? UserId { get; set; }
        public MyUser User { get; set; }
        public int MonthFixedExpensesId { get; set; }
        public MonthFixedExpenses MonthFixedExpenses { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public int? CardId { get; set; }
        public Card Card { get; set; }
        public int? PixId { get; set; }
        public Pix Pix { get; set; }
        public string OthersPaymentMethods { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime Registered { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public bool Deleted { get; set; }
    }
}
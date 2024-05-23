using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class EssentialExpenses
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int ExpensesId { get; set; }
        public FixedExpenses Expenses { get; set; }
        public int BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public PaidByEnum PaidBy { get; set; }
        public int? CardId {get; set;}
        public Card Card {get; set;}
        public DateTime WasPaid { get; set; }
        public DateTime EntryRegister { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
    }
}
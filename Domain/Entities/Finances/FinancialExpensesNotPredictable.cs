using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Customers;

namespace Domain.Entities.Finances
{
    public class FinancialExpensesNotPredictable
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int BankAccountId { get; set; }
        public FinancialBankAccount BankAccount { get; set; }
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int? CardId { get; set; }
        public FinancialCard Card { get; set; }
        public PaidByEnum PaidBy { get; set; }
        public string ItemOrPlaceName { get; set; }
        public DateTime DaySpent { get; set; }
        public DateTime EntryRegister { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
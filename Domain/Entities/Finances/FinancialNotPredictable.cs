using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;

namespace Domain.Entities.Finances
{
    public class FinancialNotPredictable
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int BankAccountId { get; set; }
        public FinancialBankAccount BankAccount { get; set; }
        public int? BillToPayListId { get; set; }
        public FinancialBillToPayList BillToPayList { get; set; }
        public PaidByEnum PaidBy { get; set; }
        public string ItemOrPlaceName { get; set; }
        public DateTime DaySpent { get; set; }
        public DateTime EntryRegister { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
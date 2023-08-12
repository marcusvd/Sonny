using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class FinancialNotPredictable
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int BankAccountId { get; set; }
        public FinancialBankAccount BankAccount { get; set; }
        public int BillToPayListId { get; set; }
        public FinancialBillToPayList BillToPayList { get; set; }
        public PaidBy PaidBy { get; set; }
        public string ItemOrPlaceName { get; set; }
        public DateTime DaySpent { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
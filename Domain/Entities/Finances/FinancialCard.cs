using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class FinancialCard
    {
        public int Id { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public decimal Limit { get; set; }
        public TypeCardEnum Type { get; set; }
        public string Number { get; set; }
        public int CheckCode { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
        public int BankAccountId { get; set; }
        public FinancialBankAccount BankAccount { get; set; }
        public List<FinancialEssentialExpenses> EssentialExpenses {get; set;}

    }
}
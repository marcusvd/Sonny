using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Shared;


namespace Domain.Entities.Finances.Bank
{
    public class CreditCardLimitOperation:RootBase
    {
        public int CardId { get; set; }
        public Card Card { get; set; }
        public decimal LimitCreditUsed { get; set; }
        public decimal PriceOfLastPayment { get; set; }
        public DateTime LastPayment { get; set; }
    }
}


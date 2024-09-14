using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;


namespace Domain.Entities.Finances.Bank
{
    public class CreditCardLimitOperation
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public decimal LimitCreditUsed { get; set; }
        public decimal PriceOfLastPayment { get; set; }
        public DateTime Registered { get; set; }
        public DateTime LastPayment { get; set; }
    }
}


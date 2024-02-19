using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Enums;


namespace Domain.Entities.Finances
{
    public class FinancialCard
    {
        public FinancialCard()
        {

        }
        public FinancialCard(
            string holder,
            string flag,
            decimal limit,
            TypeCardEnum type,
            string number,
            int cVC,
            string description,
            DateTime validate
        )
        {
            Holder = holder;
            Flag = flag;
            Limit = limit;
            Type = type;
            Number = number;
            CVC = cVC;
            Description = description;
            Validate = validate;
        }
        public int Id { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public decimal Limit { get; set; }
        public TypeCardEnum Type { get; set; }
        public string Number { get; set; }
        public int CVC { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
        public int BankAccountId { get; set; }
        public FinancialBankAccount BankAccount { get; set; }
        public List<FinancialEssentialExpenses> EssentialExpenses { get; set; }

    }
}
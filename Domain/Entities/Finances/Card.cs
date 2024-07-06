using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain.Entities.Finances.Enums;


namespace Domain.Entities.Finances
{
    public class Card
    {
        public Card()
        {

        }
        public Card(
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
        public bool Deleted { get; set; }
        public int BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public List<MonthFixedExpensesTracking> MonthFixedExpensesTrackings { get; set; }
         public List<YearlyFixedExpensesTracking> YearlyFixedExpensesTrackings { get; set; }

    }
}

 
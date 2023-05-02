using System;
using Domain.Entities.Authentication;

namespace Domain.Entities.Financial
{
    public class Card
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public decimal Limit { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }
        public int CheckCode { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
        public int CheckingAccountId { get; set; }
        public CheckingAccount CheckingAccount { get; set; }

    }
}
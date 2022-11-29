using System;

namespace Domain.Entities.Financial
{
    public class FinancingLoan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Institution { get; set; }
        public decimal Value { get; set; }
        public DateTime Started { get; set; }
        public int Expiration { get; set; }
        public int Installment { get; set; }
        public string Duplicate { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Comments { get; set; }
    }

}
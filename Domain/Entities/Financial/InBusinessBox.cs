using System;

namespace Domain.Entities.Financial
{
    public class InBusinessBox
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }  
         public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime TodayInserted { get; set; }
        public bool Settled { get; set; }

    }
}
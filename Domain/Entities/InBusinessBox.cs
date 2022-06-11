using System;

namespace Domain.Entities
{
    public class InBusinessBox
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int? ClientId { get; set; }
        public ClientEntity Client { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime TodayInserted { get; set; }
        public bool Settled { get; set; }

    }
}
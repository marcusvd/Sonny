using System;

namespace Domain.Entities
{
    public class BusinessBoxDto
    {
        public int Id { get; set; }
        public decimal Balance { get; set; }
        public DateTime Today { get; set; }

    }
}
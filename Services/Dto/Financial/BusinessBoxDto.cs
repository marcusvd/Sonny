using System;

namespace Services.Dto.Financial
{
    public class BusinessBoxDto
    {
        public int Id { get; set; }
        public decimal Balance { get; set; }
        public DateTime Today { get; set; }

    }
}
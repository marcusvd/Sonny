using System;
namespace Application.Dto.Financial
{
    public class CardDto
    {
        public int Id { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public decimal Limit { get; set; }
        public string Type { get; set; }
        public string Number { get; set; }
        public int CheckCode { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
        public int CheckingAccountId { get; set; }
        public CheckingAccountDto CheckingAccount { get; set; }
    }
}
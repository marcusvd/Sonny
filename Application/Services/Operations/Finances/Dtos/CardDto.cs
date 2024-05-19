using System;
using Application.Services.Operations.Finances.Dtos.Enums;

namespace Application.Services.Operations.Finances.Dtos
{
    public class CardDto
    {
        public int Id { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public decimal Limit { get; set; }
        public TypeCardEnumDto Type { get; set; }
        public string Number { get; set; }
        public int CVC { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
        public int BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }

    }
}
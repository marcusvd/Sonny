
using System;

namespace Application.Services.Operations.Finances.Dtos.Bank
{
    public class PixDto
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
         public DateTime Deleted { get; set; } = DateTime.MinValue;
         public DateTime Registered { get; set; } = DateTime.MinValue;
        public int BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
    }
}
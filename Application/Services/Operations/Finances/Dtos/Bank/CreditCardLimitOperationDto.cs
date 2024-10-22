using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos.Bank
{
    public class CreditCardLimitOperationDto
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public CardDto Card { get; set; }
        public int? UserId { get; set; }
        public MyUserDto User { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public decimal LimitCreditUsed { get; set; }
        public DateTime Registered { get; set; }
        public DateTime Deleted { get; set; } = DateTime.MinValue;
        public decimal PriceOfLastPayment { get; set; }
        public DateTime LastPayment { get; set; }
    }
}


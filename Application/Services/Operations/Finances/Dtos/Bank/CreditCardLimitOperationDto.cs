using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Finances.Dtos.Bank
{
    public class CreditCardLimitOperationDto : RootBaseDto
    {

        public int CardId { get; set; }
        public CardDto Card { get; set; }
        public decimal LimitCreditUsed { get; set; }
        public decimal PriceOfLastPayment { get; set; }
        public DateTime LastPayment { get; set; }
    }
}


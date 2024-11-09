
using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PaymentDataDto:RootBaseDto
    {
        public List<PartnerPaymentPixDto> Pixes { get; set; }
        public List<PartnerPaymentBankAccountDto> BanksAccounts { get; set; }
        public bool Money { get; set; } = false;
        public string Others { get; set; }
    }
}
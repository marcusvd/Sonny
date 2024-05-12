
using System.Collections.Generic;

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PaymentDataDto
    {
        public int Id { get; set; }
        public List<PartnerPaymentPixDto> Pixes { get; set; }
        public List<PartnerPaymentBankAccountDto> BanksAccounts { get; set; }
        public bool Money { get; set; } = false;
        public string Others { get; set; }
    }
}
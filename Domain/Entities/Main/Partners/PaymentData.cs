
using System.Collections.Generic;
using Domain.Entities.Finances;
using Domain.Entities.Main.Partners;
using Domain.Entities.Shared;

namespace Domain.Entities.Main
{
    public class PaymentData:RootBase
    {
        public List<PartnerPaymentPix> Pixes { get; set; }
        public List<PartnerPaymentBankAccount> BanksAccounts { get; set; }
        public bool Money { get; set; } = false;
        public string Others { get; set; }

    }
}

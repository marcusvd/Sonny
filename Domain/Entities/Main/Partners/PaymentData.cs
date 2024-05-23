
using System.Collections.Generic;
using Domain.Entities.Finances;
using Domain.Entities.Main.Partners;

namespace Domain.Entities.Main
{
    public class PaymentData
    {
        public int Id { get; set; }
        public List<PartnerPaymentPix> Pixes { get; set; }
        public List<PartnerPaymentBankAccount> BanksAccounts { get; set; }
        public bool Money { get; set; } = false;
        public bool Deleted { get; set; }
        public string Others { get; set; }

    }
}

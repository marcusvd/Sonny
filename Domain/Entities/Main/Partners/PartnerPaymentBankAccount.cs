
using System.Collections.Generic;
using Domain.Entities.Finances;
using Domain.Entities.Main.Enums;
using Domain.Entities.Main.Partners;

namespace Domain.Entities.Main
{
    public class PartnerPaymentBankAccount
    {

        public int Id { get; set; }
        public string Institution { get; set; }
        public string Account { get; set; }
        public string Agency { get; set; }
        public PaymentDataTypeAccountEnum Type { get; set; }

        public int PaymentDataId { get; set; }
        public PaymentData PaymentData { get; set; }

        public string Description { get; set; }
    }
}
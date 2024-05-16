

namespace Domain.Entities.Main.Partners
{
    public class PartnerPaymentPix
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string Holder { get; set; }
        public int PaymentDataId { get; set; }
        public PaymentData PaymentData { get; set; }

    }
}
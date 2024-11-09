

using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PartnerPaymentPixDto : RootBaseDto
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Holder { get; set; }
        public int PaymentDataId { get; set; }
        public PaymentDataDto PaymentData { get; set; }
    }
}
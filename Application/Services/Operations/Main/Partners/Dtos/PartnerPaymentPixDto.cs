

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PartnerPaymentPixDto
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string Holder { get; set; }
         public bool Deleted { get; set; }
        public int PaymentDataId { get; set; }
        public PaymentDataDto PaymentData { get; set; }

    }
}

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PaymentDataDto
    {
        public PaymentDataDto() { }
        public PaymentDataDto(string paymentName, string payment)
        {
            PaymentName = paymentName;
            Payment = payment;
        }
        public int Id { get; set; }
        public string PaymentName { get; set; }
        public string Payment { get; set; }
        public int PartnerId { get; set; }
        public  PartnerDto Partner { get; set; }

    }
}
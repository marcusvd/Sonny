
using Application.Services.Operations.Main.Partners.Enums;

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PartnerPaymentBankAccountDto
    {
        public int Id { get; set; }
        public string Institution { get; set; }
        public string Account { get; set; }
        public string Agency { get; set; }
        public PaymentDataTypeAccountEnumDto Type { get; set; }
        public int PaymentDataId { get; set; }
        public PaymentDataDto PaymentData { get; set; }
        public string Description { get; set; }
    }
}
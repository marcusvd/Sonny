
using Application.Services.Operations.Main.Partners.Enums;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PartnerPaymentBankAccountDto:RootBaseDto
    {
        public string Institution { get; set; }
        public string Holder { get; set; }
        public string Account { get; set; }
        public string Agency { get; set; }
        public PaymentDataTypeAccountEnumDto Type { get; set; }
        public int PaymentDataId { get; set; }
        public PaymentDataDto PaymentData { get; set; }
    }
}
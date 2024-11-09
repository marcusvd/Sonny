using Domain.Entities.Main.Partners.Enums;
using Domain.Entities.Shared;

namespace Domain.Entities.Main.Partners
{
  public class PartnerPaymentBankAccount:RootBase
  {
    public string Holder { get; set; }
    public string Institution { get; set; }
    public string Account { get; set; }
    public string Agency { get; set; }
    public PaymentDataTypeAccountEnum Type { get; set; }
    public int PaymentDataId { get; set; }
    public PaymentData PaymentData { get; set; }
  }
}
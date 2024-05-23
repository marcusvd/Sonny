using Domain.Entities.Main.Partners.Enums;

namespace Domain.Entities.Main.Partners
{
  public class PartnerPaymentBankAccount
  {
    public int Id { get; set; }
    public string Holder { get; set; }
    public string Institution { get; set; }
    public string Account { get; set; }
    public string Agency { get; set; }
     public bool Deleted { get; set; }
    public PaymentDataTypeAccountEnum Type { get; set; }
    public int PaymentDataId { get; set; }
    public PaymentData PaymentData { get; set; }
  }
}
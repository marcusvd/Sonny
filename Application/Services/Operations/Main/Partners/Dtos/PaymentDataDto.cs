
namespace Application.Services.Operations.Main.Partners.Dtos
{
    public class PaymentDataDto
    {
        public PaymentDataDto() { }
        public int Id { get; set; }
        public string Pix { get; set; }
        public string BankAccount { get; set; }
        public string Others { get; set; }
        public bool Money { get; set; } = false;
    }
}
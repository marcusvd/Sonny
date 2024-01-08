
namespace Domain.Entities.Main
{
    public class PaymentData
    {
        public PaymentData() { }
        public PaymentData(string pix,
                            string bankAccount,
                            string others,
                            bool money
                            )
        {
            Pix = pix;
            BankAccount = bankAccount;
            Money = money;
            Others = others;
        }
        public int Id { get; set; }
        public string Pix { get; set; }
        public string BankAccount { get; set; }
        public string Others { get; set; }
        public bool Money { get; set; } = false;

    }
}
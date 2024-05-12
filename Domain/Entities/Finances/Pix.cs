using Domain.Entities.Main;


namespace Domain.Entities.Finances
{
    public class Pix
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public int BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
    }
}
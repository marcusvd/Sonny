
namespace Application.Services.Operations.Finances.Dtos.Bank
{
    public class PixDto
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
         public bool Deleted { get; set; }
        public int BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
    }
}
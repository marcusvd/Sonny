using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Customers.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class FinancialExpensesNotPredictableDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int BankAccountId { get; set; }
        public FinancialBankAccountDto BankAccount { get; set; }
        public int? CardId { get; set; }
        public FinancialCardDto Card { get; set; }
        public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public PaidByEnumDto PaidBy { get; set; }
        public string ItemOrPlaceName { get; set; }
        public DateTime DaySpent { get; set; }
        public DateTime EntryRegister { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
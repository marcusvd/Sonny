using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Enums;

namespace Application.Services.Operations.Finances.Dtos
{
    public class FinancialNotPredictableDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int BankAccountId { get; set; }
        public FinancialBankAccountDto BankAccount { get; set; }
        public int? BillToPayListId { get; set; }
        public FinancialBillToPayListDto BillToPayList { get; set; }
        public PaidByDto PaidBy { get; set; }
        public string ItemOrPlaceName { get; set; }
        public DateTime DaySpent { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}
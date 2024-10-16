
using System;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;
using Application.Services.Operations.Finances.Dtos.PixExpenses;


namespace Application.Services.Operations.Finances.Dtos.MonthlyExpenses
{
    public class MonthlyFixedExpensePaymentDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public int BankAccountId { get; set; }
        public int? CardId { get; set; }
        public int? PixId { get; set; }
        public string OthersPaymentMethods { get; set; }
        public PixExpenseDto PixExpense { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime WasPaid { get; set; }
        public string Document { get; set; }
    }
}
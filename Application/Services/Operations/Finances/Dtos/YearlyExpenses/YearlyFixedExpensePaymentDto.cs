
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos.YearlyExpenses
{
    public class YearlyFixedExpensePaymentDto 
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
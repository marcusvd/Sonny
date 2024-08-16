using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos
{
    public class MonthFixedExpensesTrackingDto
    {
     public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int? UserId { get; set; }
        public MyUserDto User { get; set; }
        public int MonthFixedExpensesId { get; set; }
        public MonthFixedExpensesDto MonthFixedExpenses { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
        public int? CardId { get; set; }
        public CardDto Card { get; set; }
        public int? PixId { get; set; }
        public PixDto Pix { get; set; }
        public string OthersPaymentMethods { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime Registered { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public bool Deleted { get; set; }
    }
}
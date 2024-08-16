using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos.Inheritance
{
    public abstract class BaseExpenseTrackingDto
    {
      public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int? UserId { get; set; }
        public MyUserDto User { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
        public int? CardId { get; set; }
        public CardDto Card { get; set; }
        public int? PixId { get; set; }
        public PixDto Pix { get; set; }
        public string OthersPaymentMethods { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Registered { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public bool Deleted { get; set; }
    }
}
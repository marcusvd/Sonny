using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos.Bank
{
    public class CardDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public decimal CreditLimit { get; set; }
        public TypeCardEnumDto Type { get; set; }
        public string Number { get; set; }
        public int CVC { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
        public DateTime ClosingDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public DateTime Registered { get; set; }
        public bool Deleted { get; set; }
        public int BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
        public CreditCardLimitOperationDto CreditCardLimitOperation { get; set; }
        public List<CreditCardExpenseInvoiceDto> CreditCardExpensesInvoices { get; set; }

    }
}
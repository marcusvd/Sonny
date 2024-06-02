using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos
{
    public class FixedExpensesTrackingDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int FixedExpensesId { get; set; }
        public FixedExpensesDto FixedExpenses { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
        public PaidByEnumDto? PaidBy { get; set; }
        public int? CardId { get; set; }
        public CardDto Card { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime EntryRegister { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
    }
}
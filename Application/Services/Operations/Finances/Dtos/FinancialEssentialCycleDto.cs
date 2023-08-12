using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class FinancialEssentialCycleDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int BillToPayListId { get; set; }
        public FinancialBillToPayListDto BillToPayList { get; set; }
        public int BankAccountId { get; set; }
        public FinancialBankAccountDto BankAccount { get; set; }
        public PaidByDto PaidBy { get; set; }
        public DateTime WasPaid { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
    }
}
using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;
using Domain.Entities.Finances.Inheritance;

namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseInstallmentDto
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public MyUserDto User { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
        public bool Deleted { get; set; }
        public int? CardId { get; set; }
        public CardDto Card { get; set; }
        public int? PixId { get; set; }
        public PixDto Pix { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Registered { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public decimal InstallmentPrice { get; set; }
        public decimal PriceWasPaidInstallment { get; set; }
        public string InstallmentId { get; set; }
        public string CurrentInstallment { get; set; }
        public int InstallmentsQuantity { get; set; }
        public int FinancingAndLoanExpenseId { get; set; }
        public FinancingAndLoanExpenseDto FinancingAndLoanExpense { get; set; }
    }
}
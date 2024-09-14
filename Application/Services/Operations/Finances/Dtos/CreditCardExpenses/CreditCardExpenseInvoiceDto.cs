
using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Main.Companies.Dtos;


namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseInvoiceDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int CardId { get; set; }
        public CardDto Card { get; set; }
        public decimal AmountPrice { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime ClosingDate { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
        public DateTime Registered { get; set; }
        public bool Deleted { get; set; }
        public CreditCardExpenseDto CreditCardExpense { get; set; }
        public List<CreditCardExpenseDto> CreditCardExpenses { get; set; }

    }
}

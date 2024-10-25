
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Shared.Dtos;


namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseInvoiceDto:RootBaseDto
    {
        public int CardId { get; set; }
        public CardDto Card { get; set; }
        public int? PaidFromBankAccountId { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime ClosingDate { get; set; }
        public DateTime Expires { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
        public CreditCardLimitOperationDto CreditCardLimitOperation { get; set; }
        public CreditCardExpenseDto CreditCardExpense { get; set; }
        public List<CreditCardExpenseDto> CreditCardExpenses { get; set; }

    }
}

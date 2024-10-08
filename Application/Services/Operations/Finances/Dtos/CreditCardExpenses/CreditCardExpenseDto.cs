using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;

namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseDto : BaseExpenseDto
    {
        public int InstallmentNumber { get; set; }
        public decimal InstallmentPrice { get; set; }
        public string InstallmentId { get; set; }
        public string CurrentInstallment { get; set; }
        public DateTime ExpenseDay { get; set; }
        public CreditCardLimitOperationDto CreditCardLimitOperation { get; set; }
        public int? CreditCardExpenseInvoiceId { get; set; }
        public CreditCardExpenseInvoiceDto CreditCardExpenseInvoice { get; set; }
    }
}

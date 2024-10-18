using System;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;

namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseDto : BaseExpenseDto
    {
        public int InstallmentsQuantity { get; set; }
        public decimal InstallmentPrice { get; set; }
        public decimal TotalPriceInterest { get; set; }
        public decimal TotalPercentageInterest { get; set; }
        public decimal PaymentAtSight { get; set; }
        public string CurrentInstallment { get; set; }
        public DateTime ExpenseDay { get; set; }
        public CreditCardLimitOperationDto CreditCardLimitOperation { get; set; }
        public int? CreditCardExpenseInvoiceId { get; set; }
        public CreditCardExpenseInvoiceDto CreditCardExpenseInvoice { get; set; }
    }
}

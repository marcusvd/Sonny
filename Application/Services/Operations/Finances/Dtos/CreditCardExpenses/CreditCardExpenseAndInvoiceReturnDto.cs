using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExpenses;

namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseAndInvoiceReturnDto
    {
        public List<CreditCardExpenseInvoice> CreditCardExpensesInvoices { get; set; } = new();
        public List<CreditCardExpenseDto> CreditCardExpenses { get; set; } = new();
    }
}

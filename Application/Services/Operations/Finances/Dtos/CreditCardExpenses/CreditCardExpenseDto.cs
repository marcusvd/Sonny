using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;

namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseDto : BaseExpenseDto
    {
        public List<CreditCardExpenseInstallmentDto> CreditCardExpensesInstallments { get; set; }
    }
}

using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;

namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseInstallmentDto : BaseExpenseInstallmentDto
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

    }
}
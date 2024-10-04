using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;

namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseDto : BaseExpenseDto
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int InstallmentNumber { get; set; }
        public string InstallmentId { get; set; }
        public string CurrentInstallment { get; set; }
    }
}
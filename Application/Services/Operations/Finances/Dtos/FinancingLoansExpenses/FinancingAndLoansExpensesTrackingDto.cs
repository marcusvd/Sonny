using System;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Dtos.Inheritance;


namespace Application.Services.Operations.Finances.Dtos.FinancingLoansExpenses
{
    public class FinancingAndLoansExpensesTrackingDto : BaseExpensesTrackingDto
    {
        public int FinancingAndLoansExpensesId { get; set; }
        public FinancingAndLoansExpensesDto FinancingAndLoansExpenses { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int installmentNumber { get; set; }
    }
}
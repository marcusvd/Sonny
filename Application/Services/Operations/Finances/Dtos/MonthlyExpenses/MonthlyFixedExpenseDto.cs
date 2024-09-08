
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;


namespace Application.Services.Operations.Finances.Dtos.MonthlyExpenses
{
    public class MonthlyFixedExpenseDto : BaseExpenseDto
    {
        public List<MonthlyFixedExpenseInstallmentDto> MonthlyFixedExpensesInstallments { get; set; }
    }
}
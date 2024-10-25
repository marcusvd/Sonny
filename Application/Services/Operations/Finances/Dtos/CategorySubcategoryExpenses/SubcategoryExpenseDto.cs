using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses
{
    public class SubcategoryExpenseDto : RootBaseDto
    {
        public string Name { get; set; }
        public PayCycleEnumDto PayCycle { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpenseDto CategoryExpense { get; set; }
        public List<MonthlyFixedExpenseDto> MonthlyFixedExpenses { get; set; }
        public List<YearlyFixedExpenseDto> YearlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpenseDto> FinancingsAndLoansExpenses { get; set; }
        public List<VariableExpenseDto> VariablesExpenses { get; set; }
    }
}

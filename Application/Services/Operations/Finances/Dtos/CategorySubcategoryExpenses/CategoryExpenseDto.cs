using System.Collections.Generic;

using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses
{
    public class CategoryExpenseDto : RootBaseDto
    {
        public string Name { get; set; }
        public List<CreditCardExpenseDto> CreditCardExpenses { get; set; }
        public List<MonthlyFixedExpenseDto> MonthlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpenseDto> FinancingsAndLoansExpenses { get; set; }
        public List<YearlyFixedExpenseDto> YearlyFixedExpenses { get; set; }
        public List<SubcategoryExpenseDto> SubcategoriesExpenses { get; set; }
        public List<VariableExpenseDto> VariablesExpenses { get; set; }
    }
}
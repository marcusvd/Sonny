using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.CategorySubcategoryExpenses
{
    public class SubcategoryExpense : RootBase
    {
        public string Name { get; set; }
        public int CategoryExpenseId { get; set; }
        public CategoryExpense CategoryExpense { get; set; }
        public PayCycleEnum PayCycle {get; set;}
        public List<MonthlyFixedExpense> MonthlyFixedExpenses { get; set; }
        public List<YearlyFixedExpense> YearlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpense> FinancingsAndLoansExpenses { get; set; }
        public List<VariableExpense> VariablesExpenses { get; set; }
    }
}

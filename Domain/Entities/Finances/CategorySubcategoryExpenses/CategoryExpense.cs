
using System.Collections.Generic;
using Domain.Entities.Finances.CreditCardExppenses;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.CategorySubcategoryExpenses
{
    public class CategoryExpense
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public PayCycleEnum PayCycle {get; set;}
        public List<CreditCardExpenseInstallment> CreditCardExpenses { get; set; }
        public List<MonthlyFixedExpenseInstallment> MonthlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpenseInstallment> FinancingsLoansExpenses { get; set; }
        public List<YearlyFixedExpenseInstallment> YearlyFixedExpenses { get; set; }
        public List<SubcategoryExpense> SubcategoriesExpenses { get; set; }
        public List<VariableExpense> VariablesExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}

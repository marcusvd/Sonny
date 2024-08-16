using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main;


namespace Domain.Entities.Finances.Bank
{
    public class Pix
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public bool Deleted { get; set; }
        public int BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public List<MonthlyFixedExpenseTracking> MonthlyFixedExpensesTrackings { get; set; }
        public List<YearlyFixedExpenseTracking> YearlyFixedExpensesTrackings { get; set; }
        public List<VariableExpense> VariableExpenses { get; set; } = new List<VariableExpense>();
    }
}
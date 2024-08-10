using System.Collections.Generic;
using Domain.Entities.Main;


namespace Domain.Entities.Finances
{
    public class Pix
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public bool Deleted { get; set; }
        public int BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public List<MonthFixedExpensesTracking> MonthFixedExpensesTrackings { get; set; }
        public List<YearlyFixedExpensesTracking> YearlyFixedExpensesTrackings { get; set; }
        public List<VariableExpenses> VariableExpenses { get; set; } = new List<VariableExpenses>();
    }
}
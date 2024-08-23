using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using  Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.Bank
{
    public class BankAccount
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string Holder { get; set; }
        public string Institution { get; set; }
        public string Account { get; set; }
        public string Agency { get; set; }
        public string ManagerName { get; set; }
        public string ManagerContact { get; set; }
        public bool Deleted { get; set; }
        public decimal Balance { get; set; }
        public string Description { get; set; }
        public TypeAccountEnum Type { get; set; }
        public List<Card> Cards { get; set; } = new List<Card>();
        public List<MonthlyFixedExpense> MonthlyFixedExpenses { get; set; } = new List<MonthlyFixedExpense>();
        public List<YearlyFixedExpense> YearlyFixedExpenses { get; set; } = new List<YearlyFixedExpense>();
        public List<FinancingAndLoanExpense> FinancingsLoansExpenses { get; set; } = new List<FinancingAndLoanExpense>();
        public List<VariableExpense> VariablesExpenses { get; set; } = new List<VariableExpense>();
        public List<Pix> Pixes { get; set; } = new List<Pix>();

    }

}
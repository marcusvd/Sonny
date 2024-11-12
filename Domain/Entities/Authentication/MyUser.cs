using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Outsourced;
using Domain.Entities.Profile;
using Domain.Entities.ServicesBench;
using Domain.Entities.Shared;
using Domain.Entities.StockProduct;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Domain.Entities.Authentication
{
    public class MyUser : IdentityUser<int>
    {
        public MyUser()
        {

        }

        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public UserProfile Profile { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public string Group { get; set; } = "User";
        public bool Deleted { get; set; }
        public DateTime Registered { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }
        public List<UserRole> UserRoles { get; set; }

        #region 
        public List<ItemProduct> ItemsProducts { get; set; }
        public List<Stock> Stocks { get; set; }
        #endregion
        
        public List<Service> Services { get; set; }
        public List<BudgetService> BudgetsServices { get; set; }
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }
        public List<YearlyFixedExpense> YearlyFixedExpenses { get; set; }
        public List<MonthlyFixedExpense> MonthlyFixedExpenses { get; set; }
        public List<VariableExpense> VariablesExpenses { get; set; }
        public List<FinancingAndLoanExpense> FinancingAndLoansExpenses { get; set; }
        public List<BankAccount> BankAccounts { get; set; }
        public List<Card> Cards { get; set; }
        public List<CreditCardExpenseInvoice> CreditCardExpensesInvoices { get; set; }
        public List<CreditCardExpense> CreditCardExpenses { get; set; }


    }
}
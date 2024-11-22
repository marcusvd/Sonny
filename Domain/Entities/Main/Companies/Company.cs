using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main.Customers;
using Domain.Entities.Shared;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.StockProduct.ProductKind;
using Domain.Entities.StockProduct;

namespace Domain.Entities.Main.Companies
{
    public class Company
    {
        public Company()
        { }
        public Company(string name)
        {
            Name = name;
        }
        public Company(int id, string name)
        {
            Name = name;
            Id = id;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public bool Deleted { get; set; }
        public List<MyUser> MyUsers { get; set; }
        public List<Customer> Customers { get; set; }
        public List<Partner> Partners { get; set; }


        #region Products
        public List<Manufacturer> Manufacturers { get; set; }
        public List<Model> Models { get; set; }
        public List<Product> Products { get; set; }
        public List<Segment> Segments { get; set; }
        public List<ItemProduct> ItemsProducts { get; set; }
        public List<Stock> Stocks { get; set; }
        #endregion

        public List<CollectDeliver> CollectsDelivers { get; set; }
        public List<BudgetService> ServicesExecuted { get; set; }
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }
        public List<BankAccount> BankAccounts { get; set; }
        public List<CategoryExpense> CategoriesExpenses { get; set; }
        public List<MonthlyFixedExpense> MonthlyFixedExpenses { get; set; }
        public List<FinancingAndLoanExpense> FinancingsAndLoansExpenses { get; set; }
        public List<YearlyFixedExpense> YearlyFixedExpenses { get; set; }
        public List<VariableExpense> VariablesExpenses { get; set; }
        public List<Card> Cards { get; set; }
        public List<CreditCardExpense> CreditCardExpenses { get; set; }
        public List<CreditCardExpenseInvoice> CreditCardExpensesInvoices { get; set; }
        public List<TableProvidedServicePrice> TableProvidedServicesPrices { get; set; }
    }


}

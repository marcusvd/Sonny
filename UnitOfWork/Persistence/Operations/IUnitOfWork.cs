using System.Threading.Tasks;
using Repository.Data.Operations.BudgetBench;
using Repository.Data.Operations.Outsourced;
using Repository.Data.Operations.Main.Partners;
using Repository.Data.Operations.ServicesBench;
using Repository.Data.PersonalData.Contracts;
using Repository.Data.Operations.Main.Customers;
using Repository.Data.Operations.Main.Companies;
using Repository.Data.Operations.Finances;
using Repository.Data.Operations.Finances.MonthlyExpenses;
using Repository.Data.Operations.Finances.CategorySubcategoryExpenses;
using Repository.Data.Operations.Finances.YearlyExpenses;
using Repository.Data.Operations.Finances.FinancingsLoansExpenses;
using Repository.Data.Operations.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Finances.CreditCardExpenses;
using Repository.Data.Operations.Finances.CreditCardInvoiceExpense;
using Repository.Data.Operations.Finances.PixesExpenses;
using Repository.Data.Operations.ProductRepository;

namespace UnitOfWork.Persistence.Operations
{
    public interface IUnitOfWork
    {
        #region FINANCIAL
        IBankAccountRepository BankAccounts { get; }
        ICreditCardLimitOperationsRepository CreditCardLimitOperations { get; }
        ICreditCardsRepository CreditCards { get; }
        IMonthlyFixedExpensesRepository MonthlyFixedExpenses { get; }
        ICategoryExpensesRepository CategoriesExpenses { get; }
        IFinancingsAndLoansExpensesRepository FinancingsAndLoansExpenses { get; }
        IYearlyFixedExpensesRepository YearlyFixedExpenses { get; }
        IVariablesExpensesRepository VariablesExpenses { get; }
        ICreditCardExpensesRepository CreditCardExpenses { get; }
        ICreditCardExpenseInvoicesRepository CreditCardInvoicesExpenses { get; }
        IPixesExpensesRepository PixesExpenses { get; }
        IFinancingsAndLoansExpensesInstallmentRepository FinancingsAndLoansExpensesInstallments { get; }
        #endregion
        #region OUTSOURCED
        ICollectDeliverRepository CollectDeliver { get; }
        IElectronicRepairRepository ElectronicRepair { get; }
        #endregion
        #region PARTNER
        IPartnerRepository Partners { get; }
        #endregion
        #region CUSTOMER
        ICustomerRepository Customers { get; }
        #endregion
         #region PRODUCT
        // IProductRepository Products { get; }
         IProductReposirtory Products { get; }
         IProductTypeRepository ProductTypes { get; }
         ISegmentReposirtory Segments { get; }
         IManufacturerReposirtory Manufacturers { get; }
         IModelReposirtory Models { get; }
         ISpecificitiesReposirtory Specificities { get; }

        #endregion
        #region BUDGETSERVICE
        IBudgetServiceRepository BudgetsServices { get; }
        IServicePriceRepository ServicesPrices { get; }
        ITableProvidedServicesPricesRepository TableProvidedServicesPrices { get; }
        #endregion
        #region COMPANIES
        ICompanyRepository Companies { get; }
        #endregion
        #region ADDRESSES
        IAddressesRepository Addresses { get; }
        #endregion
        #region CONTACTS
        IContactsRepository Contacts { get; }
        #endregion
        Task<bool> save();
    }
}
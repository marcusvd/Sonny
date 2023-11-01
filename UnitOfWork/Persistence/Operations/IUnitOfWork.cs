using System.Threading.Tasks;
using Repository.Data.Operations.BudgetBench;
using Repository.Data.Operations.Outsourced;
using Repository.Data.Operations.Main.Partners;
using Repository.Data.Operations.Products;
using Repository.Data.Operations.ServicesBench;
using Repository.Data.PersonalData.Contracts;
using Repository.Data.Operations.Main.Customers;
using Repository.Data.Operations.Main.Companies;
using Repository.Data.Operations.Finances;

namespace UnitOfWork.Persistence.Operations
{
    public interface IUnitOfWork
    {
        #region FINANCIAL
        IFinancialBankAccountRepository BankAccounts { get; }
        IFinancialEssentialCycleRepository EssentialCycles { get; }
        IFinancialNotPredictableRepository NotPredictables { get; }
        IFinancialBillToPayListRepository BillToPayLists { get; }
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
        IProductRepository Products { get; }
        IEquipamentRepository Equipaments {get;}
        IManufacturerRepository Manufacturers {get;}
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
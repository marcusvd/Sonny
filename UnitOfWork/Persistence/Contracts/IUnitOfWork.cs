using System.Threading.Tasks;
using Repository.Data.Contracts;
using Repository.Data.Contracts.Customers;
using Repository.Data.Contracts.Financial;
using Repository.Data.Contracts.Outsourced;
using Repository.Data.PersonalData.Contracts;

namespace UnitOfWork.Persistence.Contracts
{
    public interface IUnitOfWork
    {
        #region FINANCIAL
        ITypePaymentRepository Typespayments { get; }
        ICheckingAccountRepository Checkingaccounts { get; }
        IEssentialExpenseRepository EssentialsExpenses { get; }
        IFinancingLoanRepository FinancingsLoans { get; }
        #endregion
        #region OUTSOURCED
        ICollectDeliverRepository CollectDeliver { get; }
        IElectronicRepairRepository ElectronicRepair { get; }
        #endregion
        #region PARTNER
        IPartnerRepository Partners { get; }
        #endregion
        #region STOCK
        IStockRepository Stocks { get; }
        #endregion
        #region CUSTOMER
        ICustomerRepository Customers { get; }
        #endregion
        #region SERVICEBUDGETBENCH
        IServiceBudgetRepository ServiceBudget { get; }
        IServiceBenchRepository ServicesBench { get; }
        ISolutionsPricesRepository SolutionsPrices { get; }

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
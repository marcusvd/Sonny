using System.Threading.Tasks;
using Repository.Data.Contracts;
using Repository.Data.Contracts.Financial;
using Repository.Data.Contracts.Outsourced;
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
        #region Outsourced
        ICollectDeliverRepository CollectDeliver { get; }
        IEletronicRepairRepository EletronicRepair { get; }
        #endregion
        #region PARTNER
        IPartnerRepository Partners { get; }
        #endregion
        #region Inventory
        IInventoryRepository Inventories { get; }
        #endregion
        #region Customer
        ICustomerRepository Customers { get; }
        #endregion
        #region ServiceBudgetBench
        IServiceBudgetRepository ServiceBudget { get; }
        IServiceBenchRepository ServicesBench { get; }
        ISolutionsPricesRepository SolutionsPrices { get; }

        #endregion
        #region Companies
        ICompanyRepository Companies { get; }
        #endregion
        Task<bool> save();
    }
}
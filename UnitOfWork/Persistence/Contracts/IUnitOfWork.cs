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
        ISocialNetworkRepository Socialnetworks { get; }
        ICompanyRepository Companies { get; }
        IPartnerRepository Partners { get; }
        ICollectDeliverRepository CollectDeliver { get; }
        IEletronicRepairRepository EletronicRepair { get; }
        IServiceBudgetRepository ServiceBudget { get; }
        IServiceBenchRepository ServicesBench { get; }
        ISolutionsPricesRepository SolutionsPrices { get; }
        IInventoryRepository Inventories { get; }
        ICustomerRepository Customers { get; }
        IOsRemoveEquipamentRepository OsRemoveEquipaments { get; }
        Task<bool> save();
    }
}
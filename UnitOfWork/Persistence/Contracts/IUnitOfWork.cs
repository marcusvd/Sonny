using System.Threading.Tasks;
using Repository.Contracts;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Contracts.Financial;
using UnitOfWork.Persistence.Operations;


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
        IServiceBudgetRepository ServiceBudget { get; }
        IServiceBenchRepository ServicesBench { get; }
        IEletronicRepairRepository EletronicRepair { get; }
        IEquipamentRepository Equipaments { get; }
        ISolutionsPricesRepository SolutionsPrices { get; }
        IInventoryRepository Inventories { get; }
        ICustomerRepository Customers { get; }
        IOsRemoveEquipamentRepository OsRemoveEquipaments { get; }
        Task<bool> save();
    }
}
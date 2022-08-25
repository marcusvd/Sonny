using System.Threading.Tasks;
using Repository.Contracts;
using Repository.Data.Context;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Operations;


namespace UnitOfWork.Persistence.Contracts
{
    public interface IUnitOfWork
    {
        
        ISocialNetworkRepository Socialnetworks { get; }
        ICompanyRepository Companies { get; }
        IDailyInRepository Dailyin { get; }
        IDailyOutRepository Dailyout { get; }
        IMonthlyOutFlowRepository Monthlyout { get; }
        IPartnerRepository Partners { get; }
        ICollectDeliverRepository CollectDeliver { get; }
        IServiceBudgetRepository ServiceBudget { get; }
        IServiceBenchRepository ServicesBench { get; }
        IEletronicRepairRepository EletronicRepair { get; }
        ITypePaymentRepository Typespayments { get; }
        IEquipamentRepository Equipaments { get; }
        ICheckingAccountRepository Checkingaccounts { get; }
        ICardRepository Cards { get; }
        // ISupplierRepository Suppliers { get; }
        IInventoryRepository Inventories { get; }
  //     ICategoryRepository Categories { get; }
        IClientRepository Clients { get; }
        IOsRemoveEquipamentRepository OsRemoveEquipaments { get; }
        //ISupplierTypePaymentRepository SupplierTypePaymentRepository { get; }
        Task<bool> save();
    }
}
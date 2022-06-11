using System.Threading.Tasks;
using Repository.Data.Context;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Operations;


namespace UnitOfWork.Persistence.Contracts
{
    public interface IUnitOfWork
    {
        ISocialNetworkRepository Socialnetworks { get; }
        IDailyInRepository Dailyin { get; }
        IDailyOutRepository Dailyout { get; }
        IMonthlyOutFlowRepository Monthlyout { get; }
        IPartnerRepository Partners { get; }
        ICollectDeliverRepository CollectDeliver { get; }
        IServiceBudgetRepository ServiceBudget { get; }
        IEletronicRepairRepository EletronicRepair { get; }
        ITypePaymentRepository Typespayments { get; }
        IItemRepository Items { get; }
        ICheckingAccountRepository Checkingaccounts { get; }
        ICardRepository Cards { get; }
        ISupplierRepository Suppliers { get; }
        IInventoryRepository Inventories { get; }
        ICategoryRepository Categories { get; }
        IClientRepository Clients { get; }
        //ISupplierTypePaymentRepository SupplierTypePaymentRepository { get; }
        Task<bool> save();
    }
}
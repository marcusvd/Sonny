
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Operations;
using UnitOfWork.Persistence.Contracts;

namespace UnitOfWork.Persistence.Operations
{
    public class Worker : IUnitOfWork
    {
        private SocialNetworkRepository _SOCIALNETWORKS_REPO;
        private CompanyRepository _COMPANIES_REPO;
        private DailyInRepository _DAILYIN_REPO;
        private DailyOutRepository _DAILYOUT_REPO;
        private MonthlyOutFlowRepository _MONTHLYOUT_REPO;
        private PartnerRepository _PARTNERS_REPO;
        private CollectDeliverRepository _COLLECTDELIVER_REPO;
        private EletronicRepairRepository _ELETRONIC_REPAIR_REPO;
        private ServiceBudgetRepository _SERVICE_BUGET_REPO;
        private TypePaymentRepository _TYPESPAYMENTS_REPO;
        private ItemRepository _ITEMS_REPO;
        private CheckingAccountRepository _CHECKINGACCOUNTS_REPO;
        private CardRepository _CARDS_REPO;
        private SupplierRepository _SUPPLIERS_REPO;
        private InventoryRepository _INVENTORIES_REPO;
        //  private CategoryRepository _CATEGORY_REPO;
        private ClientRepository _CLIENTS_REPO;
        private SupplierTypePay _SUPPLIERTYPEPAY;
        private OsRemoveEquipamentRepository _OSREMOVEEQUIPAMENT_REPO;
        private readonly SonnyDbContext _CONTEXT;
        public Worker(SonnyDbContext CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }


        public ISocialNetworkRepository Socialnetworks
        {
            get
            {
                return _SOCIALNETWORKS_REPO = _SOCIALNETWORKS_REPO ?? new SocialNetworkRepository(_CONTEXT);
            }
        }

        public IDailyInRepository Dailyin
        {
            get
            {
                return _DAILYIN_REPO = _DAILYIN_REPO ?? new DailyInRepository(_CONTEXT);
            }
        }

        public IDailyOutRepository Dailyout
        {
            get
            {
                return _DAILYOUT_REPO = _DAILYOUT_REPO ?? new DailyOutRepository(_CONTEXT);
            }
        }

        public IMonthlyOutFlowRepository Monthlyout
        {
            get
            {
                return _MONTHLYOUT_REPO = _MONTHLYOUT_REPO ?? new MonthlyOutFlowRepository(_CONTEXT);
            }
        }

        public IPartnerRepository Partners
        {
            get
            {
                return _PARTNERS_REPO = _PARTNERS_REPO ?? new PartnerRepository(_CONTEXT);
            }
        }

        public ITypePaymentRepository Typespayments
        {
            get
            {
                return _TYPESPAYMENTS_REPO = _TYPESPAYMENTS_REPO ?? new TypePaymentRepository(_CONTEXT);
            }
        }

        public IItemRepository Items
        {

            get
            {
                return _ITEMS_REPO = _ITEMS_REPO ?? new ItemRepository(_CONTEXT);
            }
        }

        public ICheckingAccountRepository Checkingaccounts
        {
            get
            {
                return _CHECKINGACCOUNTS_REPO = _CHECKINGACCOUNTS_REPO ?? new CheckingAccountRepository(_CONTEXT);
            }
        }

        public ICardRepository Cards
        {
            get
            {
                return _CARDS_REPO = _CARDS_REPO ?? new CardRepository(_CONTEXT);
            }
        }

        public ISupplierRepository Suppliers
        {
            get
            {
                return _SUPPLIERS_REPO = _SUPPLIERS_REPO ?? new SupplierRepository(_CONTEXT);
            }
        }

        public IInventoryRepository Inventories
        {
            get
            {
                return _INVENTORIES_REPO = _INVENTORIES_REPO ?? new InventoryRepository(_CONTEXT);
            }
        }

        // public ICategoryRepository Categories
        // {
        //     get
        //     {
        //         return _CATEGORY_REPO = _CATEGORY_REPO ?? new CategoryRepository(_CONTEXT);
        //     }
        // }
        public IClientRepository Clients
        {
            get
            {
                return _CLIENTS_REPO = _CLIENTS_REPO ?? new ClientRepository(_CONTEXT);
            }
        }

        public ISupplierTypePaymentRepository SupplierTypePay
        {
            get
            {
                return _SUPPLIERTYPEPAY = _SUPPLIERTYPEPAY ?? new SupplierTypePay(_CONTEXT);
            }
        }

        public ICollectDeliverRepository CollectDeliver
        {
            get
            {
                return _COLLECTDELIVER_REPO = _COLLECTDELIVER_REPO ?? new CollectDeliverRepository(_CONTEXT);
            }
        }

        public IEletronicRepairRepository EletronicRepair
        {
            get
            {
                return _ELETRONIC_REPAIR_REPO = _ELETRONIC_REPAIR_REPO ?? new EletronicRepairRepository(_CONTEXT);
            }
        }

        public IServiceBudgetRepository ServiceBudget
        {
            get
            {
                return _SERVICE_BUGET_REPO = _SERVICE_BUGET_REPO ?? new ServiceBudgetRepository(_CONTEXT);
            }
        }

        public IOsRemoveEquipamentRepository OsRemoveEquipaments
        {
            get
            {
                return _OSREMOVEEQUIPAMENT_REPO = _OSREMOVEEQUIPAMENT_REPO ?? new OsRemoveEquipamentRepository(_CONTEXT);
            }
        }
        public ICompanyRepository Companies
        {
            get
            {
                return _COMPANIES_REPO = _COMPANIES_REPO ?? new CompanyRepository(_CONTEXT);
            }
        }
        public async Task<bool> save()
        {
            if (await _CONTEXT.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }
    }
}

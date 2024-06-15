using System.Threading.Tasks;
using Repository.Data.Context;
using Repository.Data.Operations.Main;
using Repository.Data.Operations.BudgetBench;
using Repository.Data.Operations.Outsourced;
using Repository.Data.Operations.Main.Partners;
using Repository.Data.Operations.ProductRepository;
using Repository.Data.Operations.ServicesBench;
using Repository.Data.PersonalData.Contracts;
using Repository.Data.PersonalData.Operations;
using Repository.Data.Operations.Main.Companies;
using Repository.Data.Operations.Main.Customers;
using Repository.Data.Operations.Finances;
using Repository.Data.Operations.ProductRepository.QuantitiesRepository;

namespace UnitOfWork.Persistence.Operations
{
    public class Worker : IUnitOfWork
    {
        private readonly SonnyDbContext _CONTEXT;
        public Worker(SonnyDbContext CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        #region OUTSOURCED
        private CollectDeliverRepository _COLLECTDELIVER_REPO;
        private ElectronicRepairRepository _ELETRONIC_REPAIR_REPO;
        public ICollectDeliverRepository CollectDeliver
        {
            get
            {
                return _COLLECTDELIVER_REPO = _COLLECTDELIVER_REPO ?? new CollectDeliverRepository(_CONTEXT);
            }
        }

        public IElectronicRepairRepository ElectronicRepair
        {
            get
            {
                return _ELETRONIC_REPAIR_REPO = _ELETRONIC_REPAIR_REPO ?? new ElectronicRepairRepository(_CONTEXT);
            }
        }
        #endregion
        #region 
        private BankAccountRepository _BANKA_CCOUNT_REPO;
        public IBankAccountRepository BankAccounts
        {
            get
            {
                return _BANKA_CCOUNT_REPO = _BANKA_CCOUNT_REPO ?? new BankAccountRepository(_CONTEXT);
            }
        }
        private MonthFixedExpensesTrackingRepository _ESSENTIAL_EXPENSES_REPO;
        public IMonthFixedExpensesTrackingRepository MonthFixedExpensesTrackings
        {
            get
            {
                return _ESSENTIAL_EXPENSES_REPO = _ESSENTIAL_EXPENSES_REPO ?? new MonthFixedExpensesTrackingRepository(_CONTEXT);
            }
        }

        private ExpensesNotPredictableRepository _EXPENSES_NOT_PREDICTABLE_REPO;
        public IExpensesNotPredictableRepository ExpensesNotPredictables
        {
            get
            {
                return _EXPENSES_NOT_PREDICTABLE_REPO = _EXPENSES_NOT_PREDICTABLE_REPO ?? new ExpensesNotPredictableRepository(_CONTEXT);
            }
        }
        private MonthFixedExpensesRepository _FIXED_EXPENSES_REPO;

        public IMonthFixedExpensesRepository MonthFixedExpenses
        {
            get
            {
                return _FIXED_EXPENSES_REPO = _FIXED_EXPENSES_REPO ?? new MonthFixedExpensesRepository(_CONTEXT);
            }
        }
        private MonthFixedExpensesFillersRepository _MONTH_FIXED_EXPENSES_FILLERS;

        public IMonthFixedExpensesFillersRepository MonthFixedExpensesFillers
        {
            get
            {
                return _MONTH_FIXED_EXPENSES_FILLERS = _MONTH_FIXED_EXPENSES_FILLERS ?? new MonthFixedExpensesFillersRepository(_CONTEXT);
            }
        }
        #endregion
        #region PARTNER
        private PartnerRepository _PARTNERS_REPO;
        public IPartnerRepository Partners
        {
            get
            {
                return _PARTNERS_REPO = _PARTNERS_REPO ?? new PartnerRepository(_CONTEXT);
            }
        }
        #endregion
        #region CUSTOMER
        private CustomerRepository _CUSTOMER_REPO;
        public ICustomerRepository Customers
        {
            get
            {
                return _CUSTOMER_REPO = _CUSTOMER_REPO ?? new CustomerRepository(_CONTEXT);
            }
        }
        #endregion
        #region BUDGETSERVICEBENCH
        private BudgetServiceRepository _BUDGET_SERVICE_REPO;
        public IBudgetServiceRepository BudgetsServices
        {
            get
            {
                return _BUDGET_SERVICE_REPO = _BUDGET_SERVICE_REPO ?? new BudgetServiceRepository(_CONTEXT);
            }
        }
        private ServicePriceRepository _SERVICE_PRICE_REPO;
        public IServicePriceRepository ServicesPrices
        {
            get
            {
                return _SERVICE_PRICE_REPO = _SERVICE_PRICE_REPO ?? new ServicePriceRepository(_CONTEXT);
            }
        }
        private TableProvidedServicesPricesRepository _TABLE_PROVIDED_SERVICES_PRICES_REPO;
        public ITableProvidedServicesPricesRepository TableProvidedServicesPrices
        {
            get
            {
                return _TABLE_PROVIDED_SERVICES_PRICES_REPO = _TABLE_PROVIDED_SERVICES_PRICES_REPO ?? new TableProvidedServicesPricesRepository(_CONTEXT);
            }
        }
        #endregion
        #region COMPANIES
        private CompanyRepository _COMPANIES_REPO;
        public ICompanyRepository Companies
        {
            get
            {
                return _COMPANIES_REPO = _COMPANIES_REPO ?? new CompanyRepository(_CONTEXT);
            }
        }
        #endregion
        #region ADDRESSES
        private AddressesRepository _ADDRESSES_REPO;
        public IAddressesRepository Addresses
        {
            get
            {
                return _ADDRESSES_REPO = _ADDRESSES_REPO ?? new AddressesRepository(_CONTEXT);
            }
        }
        #endregion
        #region CONTACTS
        private ContactsRepository _CONTACTS_REPO;
        public IContactsRepository Contacts
        {
            get
            {
                return _CONTACTS_REPO = _CONTACTS_REPO ?? new ContactsRepository(_CONTEXT);
            }
        }
        #endregion
        #region PRODUCTS
        private ProductRepository _PRODUCTS_REPO;
        public IProductRepository Products
        {
            get
            {
                return _PRODUCTS_REPO = _PRODUCTS_REPO ?? new ProductRepository(_CONTEXT);
            }
        }

        private EquipamentRepository _EQUIPAMENTS_REPO;
        public IEquipamentRepository Equipaments
        {
            get
            {
                return _EQUIPAMENTS_REPO = _EQUIPAMENTS_REPO ?? new EquipamentRepository(_CONTEXT);
            }
        }

        private ItemFillRepository _ITEMS_FILL_REPO;
        public IItemFillRepository Items_Fillers
        {
            get
            {
                return _ITEMS_FILL_REPO = _ITEMS_FILL_REPO ?? new ItemFillRepository(_CONTEXT);
            }
        }
        public ModelFillRepository _MODELS_FILL_REPO;
        public IModelFillRepository Models_Fillers
        {
            get
            {
                return _MODELS_FILL_REPO = _MODELS_FILL_REPO ?? new ModelFillRepository(_CONTEXT);
            }
        }
        public ManufacturerFillRepository _MANUFACTURES_FILL_REPO;
        public IManufacturerFillRepository Manufacturers_Fillers
        {
            get
            {
                return _MANUFACTURES_FILL_REPO = _MANUFACTURES_FILL_REPO ?? new ManufacturerFillRepository(_CONTEXT);
            }
        }
        private SegmentFillRepository _SEGMENTS_FILL_REPO;
        public ISegmentFillRepository Segments_Fillers
        {
            get
            {
                return _SEGMENTS_FILL_REPO = _SEGMENTS_FILL_REPO ?? new SegmentFillRepository(_CONTEXT);
            }
        }

        private QuantitiesProductRepository _QUANTITIES_PRODUCT_REPO;
        public IQuantitiesProductRepository QuantitiesProduct
        {
            get
            {
                return _QUANTITIES_PRODUCT_REPO = _QUANTITIES_PRODUCT_REPO ?? new QuantitiesProductRepository(_CONTEXT);
            }
        }

        private TrackingRepository _TRACKINGS_PRODUCTS_REPO;
        public ITrackingRepository TrackingsProducts
        {
            get
            {
                return _TRACKINGS_PRODUCTS_REPO = _TRACKINGS_PRODUCTS_REPO ?? new TrackingRepository(_CONTEXT);
            }
        }

        #endregion

        public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;
        }
    }
}

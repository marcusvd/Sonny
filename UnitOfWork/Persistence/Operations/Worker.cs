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
using Microsoft.EntityFrameworkCore;
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
        #region FINANCIAL
        private FinancialBankAccountRepository _FINANCIAL_BANKA_CCOUNT_REPO;
        public IFinancialBankAccountRepository BankAccounts
        {
            get
            {
                return _FINANCIAL_BANKA_CCOUNT_REPO = _FINANCIAL_BANKA_CCOUNT_REPO ?? new FinancialBankAccountRepository(_CONTEXT);
            }
        }
        private FinancialEssentialExpensesRepository _FINANCIAL_ESSENTIAL_EXPENSES_REPO;
        public IFinancialEssentialExpensesRepository EssentialExpenses
        {
            get
            {
                return _FINANCIAL_ESSENTIAL_EXPENSES_REPO = _FINANCIAL_ESSENTIAL_EXPENSES_REPO ?? new FinancialEssentialExpensesRepository(_CONTEXT);
            }
        }

        private FinancialExpensesNotPredictableRepository _FINANCIAL_EXPENSES_NOT_PREDICTABLE_REPO;
        public IFinancialExpensesNotPredictableRepository ExpensesNotPredictables
        {
            get
            {
                return _FINANCIAL_EXPENSES_NOT_PREDICTABLE_REPO = _FINANCIAL_EXPENSES_NOT_PREDICTABLE_REPO ?? new FinancialExpensesNotPredictableRepository(_CONTEXT);
            }
        }
        private FinancialExpensesRepository _FINANCIAL_EXPENSES_REPO;

        public IFinancialExpensesRepository Expenses
        {
            get
            {
                return _FINANCIAL_EXPENSES_REPO = _FINANCIAL_EXPENSES_REPO ?? new FinancialExpensesRepository(_CONTEXT);
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
        public AddressesRepository _ADDRESSES_REPO;
        public IAddressesRepository Addresses
        {
            get
            {
                return _ADDRESSES_REPO = _ADDRESSES_REPO ?? new AddressesRepository(_CONTEXT);
            }
        }
        #endregion
        #region CONTACTS
        public ContactsRepository _CONTACTS_REPO;
        public IContactsRepository Contacts
        {
            get
            {
                return _CONTACTS_REPO = _CONTACTS_REPO ?? new ContactsRepository(_CONTEXT);
            }
        }
        #endregion
        #region PRODUCTS
        public ProductRepository _PRODUCTS_REPO;
        public IProductRepository Products
        {
            get
            {
                return _PRODUCTS_REPO = _PRODUCTS_REPO ?? new ProductRepository(_CONTEXT);
            }
        }

        public EquipamentRepository _EQUIPAMENTS_REPO;
        public IEquipamentRepository Equipaments
        {
            get
            {
                return _EQUIPAMENTS_REPO = _EQUIPAMENTS_REPO ?? new EquipamentRepository(_CONTEXT);
            }
        }

        public EquipamentFillRepository _EQUIPAMENTS_FILL_REPO;
        public IEquipamentFillRepository Equipaments_Fillers
        {
            get
            {
                return _EQUIPAMENTS_FILL_REPO = _EQUIPAMENTS_FILL_REPO ?? new EquipamentFillRepository(_CONTEXT);
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

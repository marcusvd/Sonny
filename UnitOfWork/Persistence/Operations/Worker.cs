using System.Threading.Tasks;
using Repository.Data.Context;
using Repository.Data.Operations.Main;
using Repository.Data.Operations.BudgetBench;
using Repository.Data.Operations.Outsourced;
using Repository.Data.Operations.Main.Partners;
using Repository.Data.Operations.Products;
using Repository.Data.Operations.ServicesBench;
using Repository.Data.PersonalData.Contracts;
using Repository.Data.PersonalData.Operations;
using UnitOfWork.Persistence.Contracts;
using Repository.Data.Operations.Main.Companies;
using Repository.Data.Operations.Main.Customers;
using Repository.Data.Operations.Finances;

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
        private FinancialEssentialCycleRepository _FINANCIAL_ESSENTIAL_CYCLE_REPO;
        public IFinancialEssentialCycleRepository EssentialCycles
        {
            get
            {
                return _FINANCIAL_ESSENTIAL_CYCLE_REPO = _FINANCIAL_ESSENTIAL_CYCLE_REPO ?? new FinancialEssentialCycleRepository(_CONTEXT);
            }
        }

        private FinancialNotPredictableRepository _FINANCIAL_NOT_PREDICTABLE_REPO;
        public IFinancialNotPredictableRepository NotPredictables
        {
            get
            {
                return _FINANCIAL_NOT_PREDICTABLE_REPO = _FINANCIAL_NOT_PREDICTABLE_REPO ?? new FinancialNotPredictableRepository(_CONTEXT);
            }
        }
        private FinancialBillToPayListRepository _FINANCIAL_BILL_TO_PAY_LISTS_REPO;

        public IFinancialBillToPayListRepository BillToPayLists
        {
            get
            {
                return _FINANCIAL_BILL_TO_PAY_LISTS_REPO = _FINANCIAL_BILL_TO_PAY_LISTS_REPO ?? new FinancialBillToPayListRepository(_CONTEXT);
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

        public ManufacturerRepository _MANUFACTURERS_REPO;
        public IManufacturerRepository Manufacturers
        {
            get
            {
                return _MANUFACTURERS_REPO = _MANUFACTURERS_REPO ?? new ManufacturerRepository(_CONTEXT);
            }
        }

        #endregion

        public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;
        }
    }
}

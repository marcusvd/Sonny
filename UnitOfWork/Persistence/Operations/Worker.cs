using System.Threading.Tasks;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Contracts.Customers;
using Repository.Data.Contracts.Financial;
using Repository.Data.Operations;
using Repository.Data.Operations.BudgetBench;
using Repository.Data.Operations.Financial;
using Repository.Data.Operations.Outsourced;
using Repository.Data.Operations.Partners;
using Repository.Data.Operations.Stock;
using Repository.Data.PersonalData.Contracts;
using Repository.Data.PersonalData.Operations;
using UnitOfWork.Persistence.Contracts;

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
        private TypePaymentRepository _TYPESPAYMENTS_REPO;
        public ITypePaymentRepository Typespayments
        {
            get
            {
                return _TYPESPAYMENTS_REPO = _TYPESPAYMENTS_REPO ?? new TypePaymentRepository(_CONTEXT);
            }
        }
        private CheckingAccountRepository _CHECKINGACCOUNTS_REPO;
        public ICheckingAccountRepository Checkingaccounts
        {
            get
            {
                return _CHECKINGACCOUNTS_REPO = _CHECKINGACCOUNTS_REPO ?? new CheckingAccountRepository(_CONTEXT);
            }
        }
        private EssentialExpenseRepository _ESSENTIALEXPENSE_REPO;
        public IEssentialExpenseRepository EssentialsExpenses
        {
            get
            {
                return _ESSENTIALEXPENSE_REPO = _ESSENTIALEXPENSE_REPO ?? new EssentialExpenseRepository(_CONTEXT);
            }
        }
        public FinancingLoanRepository _FINANCINGS_LOANS_REPO;
        public IFinancingLoanRepository FinancingsLoans
        {
            get
            {
                return _FINANCINGS_LOANS_REPO = _FINANCINGS_LOANS_REPO ?? new FinancingLoanRepository(_CONTEXT);
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
        #region SERVICEBUDGETBENCH
        private ServiceBudgetRepository _SERVICE_BUGET_REPO;
        public IServiceBudgetRepository ServiceBudget
        {
            get
            {
                return _SERVICE_BUGET_REPO = _SERVICE_BUGET_REPO ?? new ServiceBudgetRepository(_CONTEXT);
            }
        }
        private ServiceBenchRepository _SERVICE_BENCH_REPO;
        public IServiceBenchRepository ServicesBench
        {
            get
            {
                return _SERVICE_BENCH_REPO = _SERVICE_BENCH_REPO ?? new ServiceBenchRepository(_CONTEXT);
            }
        }
        private SolutionsPricesRepository _SOLUTIONSPRICES_REPO;
        public ISolutionsPricesRepository SolutionsPrices
        {
            get
            {
                return _SOLUTIONSPRICES_REPO = _SOLUTIONSPRICES_REPO ?? new SolutionsPricesRepository(_CONTEXT);
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

        #endregion

        public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;
        }
    }
}

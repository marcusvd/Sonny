using System.Threading.Tasks;
using Repository.Data.Context;
using Repository.Data.Operations.BudgetBench;
using Repository.Data.Operations.Outsourced;
using Repository.Data.Operations.Main.Partners;
using Repository.Data.Operations.ServicesBench;
using Repository.Data.PersonalData.Contracts;
using Repository.Data.PersonalData.Operations;
using Repository.Data.Operations.Main.Companies;
using Repository.Data.Operations.Main.Customers;
using Repository.Data.Operations.Finances;
using Repository.Data.Operations.Finances.MonthlyExpenses;
using Repository.Data.Operations.Finances.CategorySubcategoryExpenses;
using Repository.Data.Operations.Finances.FinancingsLoansExpenses;
using Repository.Data.Operations.Finances.YearlyExpenses;
using Repository.Data.Operations.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Finances.CreditCardExpenses;
using Repository.Data.Operations.Finances.CreditCardInvoiceExpense;
using Repository.Data.Operations.Finances.PixesExpenses;
using Repository.Data.Operations.ProductRepository;

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
        private BankAccountRepository _BANKA_CCOUNT_REPO;
        public IBankAccountRepository BankAccounts
        {
            get
            {
                return _BANKA_CCOUNT_REPO = _BANKA_CCOUNT_REPO ?? new BankAccountRepository(_CONTEXT);
            }
        }
        private CreditCardLimitOperationsRepository _CREDIT_CARD_LIMIT_OPERATION;
        public ICreditCardLimitOperationsRepository CreditCardLimitOperations
        {
            get
            {
                return _CREDIT_CARD_LIMIT_OPERATION = _CREDIT_CARD_LIMIT_OPERATION ?? new CreditCardLimitOperationsRepository(_CONTEXT);
            }
        }
        private CreditCardsRepository _CREDIT_CARDS;
        public ICreditCardsRepository CreditCards
        {
            get
            {
                return _CREDIT_CARDS = _CREDIT_CARDS ?? new CreditCardsRepository(_CONTEXT);
            }
        }

        private MonthlyFixedExpensesRepository _MONTHLY_FIXED_EXPENSES_REPO;

        public IMonthlyFixedExpensesRepository MonthlyFixedExpenses
        {
            get
            {
                return _MONTHLY_FIXED_EXPENSES_REPO = _MONTHLY_FIXED_EXPENSES_REPO ?? new MonthlyFixedExpensesRepository(_CONTEXT);
            }
        }

        private CategoryExpensesRepository _CATEGORIES_EXPENSES;

        public ICategoryExpensesRepository CategoriesExpenses
        {
            get
            {
                return _CATEGORIES_EXPENSES = _CATEGORIES_EXPENSES ?? new CategoryExpensesRepository(_CONTEXT);
            }
        }

        private FinancingsAndLoansExpensesRepository FINANCINGS_AND_LOANS_EXPENSES_REPO;
        public IFinancingsAndLoansExpensesRepository FinancingsAndLoansExpenses
        {
            get
            {
                return FINANCINGS_AND_LOANS_EXPENSES_REPO = FINANCINGS_AND_LOANS_EXPENSES_REPO ?? new FinancingsAndLoansExpensesRepository(_CONTEXT);
            }
        }

        private YearlyFixedExpensesRepository _YEARLY_FIXED_EXPENSES_REPO;

        public IYearlyFixedExpensesRepository YearlyFixedExpenses
        {
            get
            {
                return _YEARLY_FIXED_EXPENSES_REPO = _YEARLY_FIXED_EXPENSES_REPO ?? new YearlyFixedExpensesRepository(_CONTEXT);
            }
        }

        private VariablesExpensesRepository _VARIABLES_EXPENSES_REPO;
        public IVariablesExpensesRepository VariablesExpenses
        {
            get
            {
                return _VARIABLES_EXPENSES_REPO = _VARIABLES_EXPENSES_REPO ?? new VariablesExpensesRepository(_CONTEXT);
            }
        }

        private CreditCardExpensesRepository _CREDIT_CARD_EXPENSES_REPO;
        public ICreditCardExpensesRepository CreditCardExpenses
        {
            get
            {
                return _CREDIT_CARD_EXPENSES_REPO = _CREDIT_CARD_EXPENSES_REPO ?? new CreditCardExpensesRepository(_CONTEXT);
            }
        }
        private CreditCardExpenseInvoicesRepository _CREDIT_CARD_INVOICES_EXPENSES_REPO;
        public ICreditCardExpenseInvoicesRepository CreditCardInvoicesExpenses
        {
            get
            {
                return _CREDIT_CARD_INVOICES_EXPENSES_REPO = _CREDIT_CARD_INVOICES_EXPENSES_REPO ?? new CreditCardExpenseInvoicesRepository(_CONTEXT);
            }
        }

        private PixesExpensesRepository _PIXES_EXPENSES_REPO;
        public IPixesExpensesRepository PixesExpenses
        {
            get
            {
                return _PIXES_EXPENSES_REPO = _PIXES_EXPENSES_REPO ?? new PixesExpensesRepository(_CONTEXT);
            }
        }
        private FinancingsAndLoansExpensesInstallmentRepository _FINANCINGS_AND_LOANS_EXPENSES_INSTALLMENT_REPO;
        public IFinancingsAndLoansExpensesInstallmentRepository FinancingsAndLoansExpensesInstallments
        {
            get
            {
                return _FINANCINGS_AND_LOANS_EXPENSES_INSTALLMENT_REPO = _FINANCINGS_AND_LOANS_EXPENSES_INSTALLMENT_REPO ?? new FinancingsAndLoansExpensesInstallmentRepository(_CONTEXT);
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
        // private ProductRepository _PRODUCTS_REPO;
        // public IProductRepository Products
        // {
        //     get
        //     {
        //         return _PRODUCTS_REPO = _PRODUCTS_REPO ?? new ProductRepository(_CONTEXT);
        //     }
        // }

         private StockReposirtory _Stock_Repo;
         public IStockReposirtory Stocks
         {
             get
             {
                 return _Stock_Repo = _Stock_Repo ?? new StockReposirtory(_CONTEXT);
             }
         }

         private ProductTypeRepository PRODUCTTYPE_REPO;
         public IProductTypeRepository ProductsTypes
         {
             get
             {
                 return PRODUCTTYPE_REPO = PRODUCTTYPE_REPO ?? new ProductTypeRepository(_CONTEXT);
             }
         }
        // public ModelFillRepository _MODELS_FILL_REPO;
        // public IModelFillRepository Models_Fillers
        // {
        //     get
        //     {
        //         return _MODELS_FILL_REPO = _MODELS_FILL_REPO ?? new ModelFillRepository(_CONTEXT);
        //     }
        // }
        // public ManufacturerFillRepository _MANUFACTURES_FILL_REPO;
        // public IManufacturerFillRepository Manufacturers_Fillers
        // {
        //     get
        //     {
        //         return _MANUFACTURES_FILL_REPO = _MANUFACTURES_FILL_REPO ?? new ManufacturerFillRepository(_CONTEXT);
        //     }
        // }
        // private SegmentFillRepository _SEGMENTS_FILL_REPO;
        // public ISegmentFillRepository Segments_Fillers
        // {
        //     get
        //     {
        //         return _SEGMENTS_FILL_REPO = _SEGMENTS_FILL_REPO ?? new SegmentFillRepository(_CONTEXT);
        //     }
        // }

        // private QuantitiesProductRepository _QUANTITIES_PRODUCT_REPO;
        // public IQuantitiesProductRepository QuantitiesProduct
        // {
        //     get
        //     {
        //         return _QUANTITIES_PRODUCT_REPO = _QUANTITIES_PRODUCT_REPO ?? new QuantitiesProductRepository(_CONTEXT);
        //     }
        // }

        // private TrackingRepository _TRACKINGS_PRODUCTS_REPO;
        // public ITrackingRepository TrackingsProducts
        // {
        //     get
        //     {
        //         return _TRACKINGS_PRODUCTS_REPO = _TRACKINGS_PRODUCTS_REPO ?? new TrackingRepository(_CONTEXT);
        //     }
        // }



        #endregion

        public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;
        }
    }
}


using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Contracts.Financial;
using Repository.Data.Contracts.Outsourced;
using Repository.Data.Operations;
using Repository.Data.Operations.BudgetBench;
using Repository.Data.Operations.Financial;
using Repository.Data.Operations.Outsourced;
using UnitOfWork.Persistence.Contracts;

namespace UnitOfWork.Persistence.Operations
{
    public class Worker : IUnitOfWork
    {
        private SocialNetworkRepository _SOCIALNETWORKS_REPO;
        private CompanyRepository _COMPANIES_REPO;
        private ServiceBudgetRepository _SERVICE_BUGET_REPO;
        private ServiceBenchRepository _SERVICE_BENCH_REPO;
        private SolutionsPricesRepository _SOLUTIONSPRICES_REPO;
        private InventoryRepository _INVENTORIES_REPO;
        private CustomerRepository _CUSTOMER_REPO;
        private OsRemoveEquipamentRepository _OSREMOVEEQUIPAMENT_REPO;
        private readonly SonnyDbContext _CONTEXT;
        public Worker(SonnyDbContext CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        #region Outsourced
        private CollectDeliverRepository _COLLECTDELIVER_REPO;
        private EletronicRepairRepository _ELETRONIC_REPAIR_REPO;
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

        public ISocialNetworkRepository Socialnetworks
        {
            get
            {
                return _SOCIALNETWORKS_REPO = _SOCIALNETWORKS_REPO ?? new SocialNetworkRepository(_CONTEXT);
            }
        }

        public IInventoryRepository Inventories
        {
            get
            {
                return _INVENTORIES_REPO = _INVENTORIES_REPO ?? new InventoryRepository(_CONTEXT);
            }
        }

        public ICustomerRepository Customers
        {
            get
            {
                return _CUSTOMER_REPO = _CUSTOMER_REPO ?? new CustomerRepository(_CONTEXT);
            }
        }

        public IServiceBudgetRepository ServiceBudget
        {
            get
            {
                return _SERVICE_BUGET_REPO = _SERVICE_BUGET_REPO ?? new ServiceBudgetRepository(_CONTEXT);
            }
        }
        public IServiceBenchRepository ServicesBench
        {
            get
            {
                return _SERVICE_BENCH_REPO = _SERVICE_BENCH_REPO ?? new ServiceBenchRepository(_CONTEXT);
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
        public ISolutionsPricesRepository SolutionsPrices
        {
            get
            {
                return _SOLUTIONSPRICES_REPO = _SOLUTIONSPRICES_REPO ?? new SolutionsPricesRepository(_CONTEXT);
            }
        }

        public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;
        }
    }
}

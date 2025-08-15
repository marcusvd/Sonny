using Microsoft.EntityFrameworkCore;
using Domain.Entities.Shared;
using Repository.Data.RelationshipEntities;
using Domain.Entities.Outsourced;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Domain.Entities.Authentication;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Main.Partners;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Microsoft.Extensions.Configuration;
using Domain.Entities.Finances.PixExpenses;
using Domain.Entities.StockProduct.ProductKind;
using Domain.Entities.StockProduct;
using Domain.Entities.RemoteCmd;
using Domain.Entities.RemoteCmd.ReturnResults;

namespace Repository.Data.Context
{

    public class SonnyDbContext : IdentityDbContext<MyUser, Role, int,
                                IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                IdentityRoleClaim<int>, IdentityUserToken<int>>
    {

        #region Shared
        public DbSet<Address> SD_Addresses { get; set; }
        public DbSet<Contact> SD_Contacts { get; set; }
        public DbSet<SocialNetwork> SD_socialnetworks { get; set; }
        #endregion
        #region Outsourced
        public DbSet<CollectDeliver> OS_CollectsDelivers { get; set; }
        public DbSet<BillingFrom> OS_BillingsFroms { get; set; }
        public DbSet<Destiny> OS_Destinies { get; set; }
        public DbSet<ElectronicRepair> OS_ElectronicsRepairs { get; set; }
        #endregion
        #region Budget-Service
        public DbSet<BudgetService> BS_BudgetsServices { get; set; }
        public DbSet<CollectDeliverCosts> BS_CollectsDeliversCosts { get; set; }
        public DbSet<Repair> BS_Repairs { get; set; }
        public DbSet<Service> BS_Services { get; set; }
        public DbSet<TableProvidedServicePrice> BS_TableProvidedServicesPrices { get; set; }
        #endregion
        #region Financings
        public DbSet<BankAccount> FN_BankAccount { get; set; }
        public DbSet<Pix> FN_Pixes { get; set; }
        public DbSet<Card> FN_Cards { get; set; }
        public DbSet<CreditCardLimitOperation> FN_CreditCardLimitOperations { get; set; }
        public DbSet<CategoryExpense> FN_CategoriesExpenses { get; set; }
        public DbSet<SubcategoryExpense> FN_SubcategoriesExpenses { get; set; }
        public DbSet<MonthlyFixedExpense> FN_MonthlyFixedExpenses { get; set; }
        public DbSet<YearlyFixedExpense> FN_YearlyFixedExpenses { get; set; }
        public DbSet<CashWithdrawnExpense> FN_CashWithdrawnExpenses { get; set; }
        public DbSet<FinancingAndLoanExpense> FN_FinancingsAndLoansExpenses { get; set; }
        public DbSet<FinancingAndLoanExpenseInstallment> FN_FinancingsAndLoansExpensesInstallments { get; set; }
        public DbSet<CreditCardExpense> FN_CreditCardExpenses { get; set; }
        public DbSet<CreditCardExpenseInvoice> FN_CreditCardExpensesInvoices { get; set; }
        public DbSet<PixExpense> FN_PixExpenses { get; set; }

        #endregion
        #region Products
        public DbSet<Product> PD_Products { get; set; }
        public DbSet<ProductType> PD_ProductTypes { get; set; }
        public DbSet<Manufacturer> PD_Manufacturers { get; set; }
        public DbSet<Segment> PD_Segments { get; set; }
        public DbSet<Model> PD_Models { get; set; }
        public DbSet<Specificities> PD_Specificities { get; set; }

        #endregion
        #region Customers/Companies/Partners
        public DbSet<Customer> MN_Customers { get; set; }
        public DbSet<Partner> MN_Partners { get; set; }
        public DbSet<PaymentData> MN_PaymentsData { get; set; }
        public DbSet<PartnerPaymentPix> MN_PartnerPaymentPixes { get; set; }
        public DbSet<PartnerPaymentBankAccount> MN_PartnerPaymentBankAccounts { get; set; }
        public DbSet<Company> MN_Companies { get; set; }
        public DbSet<AdditionalCosts> MN_AdditionalCosts { get; set; }
        public DbSet<PhysicallyMovingCosts> MN_PhysicallyMovingCosts { get; set; }
        #endregion
        #region RemoteCmd
        public DbSet<RemoteCmdMachine> RD_RemotesCmdsMachines { get; set; }
        public DbSet<Target> RD_Targets { get; set; }
        public DbSet<ResultExecutedCommand> RD_ResultsExecutedCommands { get; set; }
        #endregion



        private IConfiguration _configuration;
        public SonnyDbContext(DbContextOptions<SonnyDbContext> opt, IConfiguration Configuration) : base(opt)
        {
            _configuration = Configuration;

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string cxStr = _configuration.GetConnectionString("SonnyDb");
            optionsBuilder.UseMySql(ServerVersion.AutoDetect(cxStr), opt => opt.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Shared
            builder.ApplyConfiguration(new AddressFluentApi());
            builder.ApplyConfiguration(new ContactFluentApi());
            builder.ApplyConfiguration(new SocialNetworkFluentApi());

            //Main
            builder.ApplyConfiguration(new PhysicallyMovingCostsFluentApi());

            //Partner
            builder.ApplyConfiguration(new PartnerFluentApi());
            builder.ApplyConfiguration(new PartnerPaymentDataFluentApi());
            builder.ApplyConfiguration(new PartnerPaymentBankAccountFluentApi());
            builder.ApplyConfiguration(new PartnerPaymentPixFluentApi());


            //Customer - Companiy
            builder.ApplyConfiguration(new CustomerFluentApi());
            builder.ApplyConfiguration(new AdditionalCostsFluentApi());
            builder.ApplyConfiguration(new CompanyFluentApi());
            //product
            builder.ApplyConfiguration(new ProductFluentApi());

            builder.ApplyConfiguration(new ProductTypeFluentApi());
            // builder.ApplyConfiguration(new ProductFluentApi());
            builder.ApplyConfiguration(new ManufacturerFluentApi());
            builder.ApplyConfiguration(new SegmentFluentApi());
            builder.ApplyConfiguration(new ModelFluentApi());
            builder.ApplyConfiguration(new SpecificitiesFluentApi());

            //OutSource
            builder.ApplyConfiguration(new CollectDeliverFluentApi());
            builder.ApplyConfiguration(new BillingFromFluentApi());
            builder.ApplyConfiguration(new DestinyFluentApi());

            //ServiceBench
            builder.ApplyConfiguration(new ServiceFluentApi());
            builder.ApplyConfiguration(new TableProvidedServicesPriceFluentApi());
            // builder.ApplyConfiguration(new BudgetServiceFluentApi());

            //Finances
            builder.ApplyConfiguration(new BankAccountFluentApi());
            builder.ApplyConfiguration(new PixFluentApi());
            builder.ApplyConfiguration(new CardFluentApi());
            builder.ApplyConfiguration(new PixExpenseFluentApi());
            builder.ApplyConfiguration(new CategoryExpensesFluentApi());
            builder.ApplyConfiguration(new SubcategoryExpensesFluentApi());
            builder.ApplyConfiguration(new FinancingAndLoanExpenseFluentApi());
            builder.ApplyConfiguration(new VariableExpenseFluentApi());
            builder.ApplyConfiguration(new MonthlyFixedExpenseFluentApi());
            builder.ApplyConfiguration(new YearlyFixedExpenseFluentApi());
            builder.ApplyConfiguration(new CreditCardExpenseFluentApi());
            builder.ApplyConfiguration(new CreditCardExpenseInvoiceFluentApi());

            //Identity
            builder.ApplyConfiguration(new IdentityUserLoginFluentApi());
            builder.ApplyConfiguration(new IdentityRoleClaimsFluentApi());
            builder.ApplyConfiguration(new IdentityUserClaimFluentApi());
            builder.ApplyConfiguration(new IdentityUserFluentApi());
            builder.ApplyConfiguration(new IdentityUserRoleFluentApi());
            builder.ApplyConfiguration(new IdentityRoleFluentApi());
            builder.ApplyConfiguration(new IdentityUserTokenFluentApi());
            builder.ApplyConfiguration(new UserRoleFluentApi());
            builder.ApplyConfiguration(new MyUserFluentApi());

            //RemoteCmd
            builder.ApplyConfiguration(new RemoteCmdMachineApi());
            builder.ApplyConfiguration(new TargetApi());
        }
    }
}
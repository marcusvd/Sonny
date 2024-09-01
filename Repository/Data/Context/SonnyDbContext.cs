using Microsoft.EntityFrameworkCore;
using Domain.Entities.Shared;
using Repository.Data.RelationshipEntities;
using Domain.Entities.Outsourced;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Domain.Entities.Authentication;
using Domain.Entities.StkProduct;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Fill.StkProduct;
using Domain.Entities.Main.Partners;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.CreditCardExppenses;

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
        public DbSet<CategoryExpense> FN_CategoriesExpenses  { get; set; }
        public DbSet<SubcategoryExpense> FN_SubcategoriesExpenses { get; set; }
        public DbSet<MonthlyFixedExpense> FN_MonthlyFixedExpenses { get; set; }
        // public DbSet<MonthlyFixedExpenseTracking> FN_MonthlyFixedExpensesTrackings { get; set; }
        public DbSet<YearlyFixedExpense> FN_YearlyFixedExpenses { get; set; }
        // public DbSet<YearlyFixedExpenseTracking> FN_YearlyFixedExpensesTrackings { get; set; }
        public DbSet<VariableExpense> FN_VariablesExpenses { get; set; }
        public DbSet<FinancingAndLoanExpense> FN_FinancingsAndLoansExpenses { get; set; }
        // public DbSet<FinancingAndLoanExpenseTracking> FN_FinancingsAndLoansExpensesTrackings { get; set; }
        public DbSet<CreditCardExpense> FN_CreditCardExpenses { get; set; }
        #endregion
        #region  Products
        public DbSet<Product> PD_Products { get; set; }
        public DbSet<Quantity> PD_Quantities { get; set; }
        public DbSet<Tracking> PD_Trackings { get; set; }
        public DbSet<Equipament> PD_Equipaments { get; set; }
        //Fillers
        public DbSet<Item> PD_Items_Fillers { get; set; }
        public DbSet<Manufacturer> PD_Manufacturers_Fillers { get; set; }
        public DbSet<Segment> PD_Segments_Fillers { get; set; }
        public DbSet<Model> PD_Models_Fillers { get; set; }

        #endregion
        #region  Customers/Companies/Partners
        public DbSet<Customer> MN_Customers { get; set; }
        public DbSet<Partner> MN_Partners { get; set; }
        public DbSet<PaymentData> MN_PaymentsData { get; set; }
        public DbSet<PartnerPaymentPix> MN_PartnerPaymentPixes { get; set; }
        public DbSet<PartnerPaymentBankAccount> MN_PartnerPaymentBankAccounts { get; set; }
        public DbSet<Company> MN_Companies { get; set; }
        public DbSet<AdditionalCosts> MN_AdditionalCosts { get; set; }
        public DbSet<PhysicallyMovingCosts> MN_PhysicallyMovingCosts { get; set; }
        #endregion

        public SonnyDbContext(DbContextOptions<SonnyDbContext> opt) : base(opt)
        { }
     

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //General
            builder.ApplyConfiguration(new PartnerFluentApi());
            builder.ApplyConfiguration(new PartnerPaymentDataFluentApi());

            builder.ApplyConfiguration(new CustomerFluentApi());
            builder.ApplyConfiguration(new CompanyFluentApi());
            //product
            builder.ApplyConfiguration(new ProductFluentApi());
            builder.ApplyConfiguration(new QuantityFluentApi());
            builder.ApplyConfiguration(new EquipamentFluentApi());
            //Fill
            builder.ApplyConfiguration(new ItemFillFluentApi());
            builder.ApplyConfiguration(new ManufacturerFillFluentApi());
            builder.ApplyConfiguration(new ModelFillFluentApi());
            builder.ApplyConfiguration(new SegmentFillFluentApi());

            //OutSource
            builder.ApplyConfiguration(new CollectDeliverFluentApi());
            //ServiceBench
            builder.ApplyConfiguration(new ServiceFluentApi());
            builder.ApplyConfiguration(new TableProvidedServicesPriceFluentApi());
            builder.ApplyConfiguration(new BudgetServiceFluentApi());

            //Finances
            builder.ApplyConfiguration(new BankAccountFluentApi());
            builder.ApplyConfiguration(new PixFluentApi());
            builder.ApplyConfiguration(new CardFluentApi());
            // builder.ApplyConfiguration(new MonthlyExpensesFluentApi());
            // builder.ApplyConfiguration(new YearlyFixedExpensesFluentApi());
            builder.ApplyConfiguration(new CategoryExpensesFluentApi());
            builder.ApplyConfiguration(new SubcategoryExpensesFluentApi());

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
        }
    }
}
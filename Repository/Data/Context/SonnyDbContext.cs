using Microsoft.EntityFrameworkCore;
using Domain.Entities.Shared;
using Repository.Data.RelationshipEntities;
using Domain.Entities.Outsourced;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Domain.Entities.Authentication;
using Domain.Entities.Stocks;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Companies;
using Domain.Entities.Finances;
using Domain.Entities.Main.Inheritances;

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
        public DbSet<Price> BS_Prices { get; set; }
        public DbSet<Service> BS_Services { get; set; }
        public DbSet<TableProvidedServicePrice> BS_TableProvidedServicesPrices { get; set; }
        #endregion
        #region Financings
        public DbSet<FinancialBankAccount> FN_BankAccount { get; set; }
        public DbSet<FinancialCard> FN_Cards { get; set; }
        public DbSet<FinancialBillToPayList> FN_BillToPayList { get; set; }
        public DbSet<FinancialEssentialCycle> FN_EssentialCycle { get; set; }
        public DbSet<FinancialNotPredictable> FN_NotPredictable { get; set; }
        #endregion
        #region  Products
        public DbSet<Stock> PD_Stocks { get; set; }
        public DbSet<Product> PD_Products { get; set; }
        public DbSet<Manufacturer> PD_Manufacturers { get; set; }
        public DbSet<EquipamentType> PD_EquipamentTypes { get; set; }
        public DbSet<Quantity> PD_Quantities { get; set; }
        public DbSet<Tracking> PD_Trackings { get; set; }
        #endregion
        #region  Customers/Companies/Partners
        public DbSet<Customer> MN_Customers { get; set; }
        public DbSet<Partner> MN_Partners { get; set; }
        public DbSet<Company> MN_Companies { get; set; }
        public DbSet<PhysicallyMovingCosts> MN_PhysicallyMovingCosts { get; set; }
        #endregion

        public SonnyDbContext(DbContextOptions<SonnyDbContext> opt) : base(opt)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //General
            builder.ApplyConfiguration(new PartnerFluentApi());
            builder.ApplyConfiguration(new CustomerFluentApi());
            builder.ApplyConfiguration(new CompanyFluentApi());
            //product
            builder.ApplyConfiguration(new ProductFluentApi());
            builder.ApplyConfiguration(new QuantityFluentApi());
            //OutSource
            builder.ApplyConfiguration(new CollectDeliverFluentApi());
            //ServiceBench
            builder.ApplyConfiguration(new ServiceFluentApi());


            //Finances
            builder.ApplyConfiguration(new BankAccountFluentApi());
            builder.ApplyConfiguration(new FinancialBillToPayListFluentApi());

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
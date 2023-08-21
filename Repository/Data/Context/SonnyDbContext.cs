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

namespace Repository.Data.Context
{

    public class SonnyDbContext : IdentityDbContext<MyUser, Role, int,
                                IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                IdentityRoleClaim<int>, IdentityUserToken<int>>
    {

        #region Shared
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<SocialNetwork> socialnetworks { get; set; }
        #endregion
        #region Companies
        public DbSet<Company> Companies { get; set; }
        #endregion
        #region Partners
        public DbSet<Partner> Partners { get; set; }
        #endregion
        #region Outsourced
        public DbSet<CollectDeliver> CollectsDelivers { get; set; }
        public DbSet<BillingFrom> BillingsFroms { get; set; }
        public DbSet<Destiny> Destinies { get; set; }
        public DbSet<ElectronicRepair> ElectronicsRepairs { get; set; }
        #endregion
        #region Service-Bench
        public DbSet<BudgetService> BudgetsServices { get; set; }
        public DbSet<CollectDeliverCosts> CollectsDeliversCosts { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<TableProvidedServicePrice> TableProvidedServicesPrices { get; set; }
        #endregion
        #region Financings
        public DbSet<FinancialBankAccount> FinancialBankAccount { get; set; }
        public DbSet<FinancialBillToPayList> FinancialBillToPayList { get; set; }
        public DbSet<FinancialEssentialCycle> FinancialEssentialCycle { get; set; }
        public DbSet<FinancialNotPredictable> FinancialNotPredictable { get; set; }
        #endregion
        #region  Products
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Quantity> Quantities { get; set; }
        public DbSet<Tracking> Trackings { get; set; }
        #endregion
        #region  Customers
        public DbSet<Customer> Customers { get; set; }
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
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Entities.Shared;
using Repository.Data.RelationshipEntities;
using Domain.Entities.BudgetBench;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Domain.Entities.Authentication;
using Domain.Entities.Stocks;

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
        public DbSet<ElectronicRepair> ElectronicsRepairs { get; set; }
        #endregion
        #region Budget-Bench
        public DbSet<ServiceBudget> ServicesBudgets { get; set; }
        public DbSet<SolutionPrice> SolutionsPrices { get; set; }
        public DbSet<ServiceBench> ServicesBench { get; set; }
        #endregion
        #region Financings
        public DbSet<CheckingAccount> CheckingAccounts { get; set; }
        public DbSet<FinancingLoan> FinancingsLoans { get; set; }
        public DbSet<TypePayment> TypesPayments { get; set; }
        public DbSet<EssentialExpense> EssentialsExpenses { get; set; }
        #endregion
        #region  Stocks
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductHistory> ProductsHistories { get; set; }
        #endregion
        #region  Customers
        public DbSet<Customer> Customers { get; set; }
        #endregion

        public SonnyDbContext(DbContextOptions<SonnyDbContext> opt) : base(opt)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ServiceBudgetFluentApi());
            builder.ApplyConfiguration(new ServiceBenchFluentApi());
            builder.ApplyConfiguration(new CollectDeliverFluentApi());
            builder.ApplyConfiguration(new ChargeFormFluentApi());
            builder.ApplyConfiguration(new CheckingAccountFluentApi());
            builder.ApplyConfiguration(new CompanyFluentApi());
            //
            builder.ApplyConfiguration(new IdentityUserLoginFluentApi());
            builder.ApplyConfiguration(new IdentityRoleClaimsFluentApi());
            builder.ApplyConfiguration(new IdentityUserClaimFluentApi());
            builder.ApplyConfiguration(new IdentityUserFluentApi());
            builder.ApplyConfiguration(new IdentityUserRoleFluentApi());
            builder.ApplyConfiguration(new IdentityRoleFluentApi());
            builder.ApplyConfiguration(new IdentityUserTokenFluentApi());
            builder.ApplyConfiguration(new UserRoleFluentApi());

            
            // builder.ApplyConfiguration(new InventoryFluentApi());
            // builder.ApplyConfiguration(new DestinyCollectDeliverFluentApi());
            // builder.ApplyConfiguration(new SourceCollectDeliverFluentApi());
            // builder.ApplyConfiguration(new PartnerFluentApi());
            // builder.ApplyConfiguration(new ClientEntityFluentApi());
        }
    }
}
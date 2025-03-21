using Domain.Entities.Authentication;
using Domain.Entities.Finances;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Outsourced;
using Domain.Entities.ServicesBench;
using Domain.Entities.StockProduct;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    #region UserRole
    public class IdentityUserRoleFluentApi : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.ToTable("aspnetUserRoles").HasKey(usr => new { usr.UserId, usr.RoleId });
        }
    }

    #endregion

    #region IdentityUserLogin
    public class IdentityUserLoginFluentApi : IEntityTypeConfiguration<IdentityUserLogin<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserLogin<int>> builder)
        {

            builder.ToTable("aspnetUserLogins");
            builder.HasKey(x => x.UserId);
        }
    }
    #endregion

    #region IdentityUserToken
    public class IdentityUserTokenFluentApi : IEntityTypeConfiguration<IdentityUserToken<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserToken<int>> builder)
        {

            builder.HasKey(x => new { x.UserId, x.LoginProvider, x.Name });
            builder.ToTable("AspNetUserTokens");
        }
    }
    #endregion

    #region IdentityUserClaim
    public class IdentityUserClaimFluentApi : IEntityTypeConfiguration<IdentityUserClaim<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserClaim<int>> builder)
        {
            builder.ToTable("aspnetUserClaims");
        }
    }

    #endregion
    #region IdentityUser
    public class IdentityUserFluentApi : IEntityTypeConfiguration<IdentityUser<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUser<int>> builder)
        {
            builder.ToTable("aspnetUsers");
        }
    }

    #endregion

    #region IdentityRole
    public class IdentityRoleFluentApi : IEntityTypeConfiguration<IdentityRole<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityRole<int>> builder)
        {
            builder.ToTable("aspnetRoles");
        }
    }

    #endregion

    #region RoleClaims
    public class IdentityRoleClaimsFluentApi : IEntityTypeConfiguration<IdentityRoleClaim<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityRoleClaim<int>> builder)
        {
            builder.ToTable("aspnetRoleClaims");
        }
    }

    #endregion

    #region UserRole
    public class UserRoleFluentApi : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.HasKey(usr => new { usr.UserId, usr.RoleId });

            builder.HasOne(x => x.Role)
           .WithMany(x => x.UserRoles)
           .HasForeignKey(x => x.RoleId)
           .IsRequired();

            builder.HasOne(x => x.MyUser)
           .WithMany(x => x.UserRoles)
           .HasForeignKey(x => x.UserId)
           .IsRequired();
        }
    }
    #endregion
    #region MyUser
    public class MyUserFluentApi : IEntityTypeConfiguration<MyUser>
    {
        public void Configure(EntityTypeBuilder<MyUser> builder)
        {
             builder.HasMany<Product>(x => x.Products).WithOne(x => x.User)
            .HasForeignKey(fk => fk.UserId);

            builder.HasMany<CollectDeliver>(x => x.CollectsDelivers).WithOne(x => x.User)
            .HasForeignKey(fk => fk.UserId);

            builder.HasMany<BudgetService>(x => x.BudgetsServices).WithOne(x => x.User)
            .HasForeignKey(fk => fk.UserId);

            builder.HasMany<Service>(x => x.Services).WithOne(x => x.User)
            .HasForeignKey(fk => fk.UserId);

            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses).WithOne(x => x.User)
            .HasForeignKey(fk => fk.UserId);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses).WithOne(x => x.User)
            .HasForeignKey(fk => fk.UserId);

            builder.HasMany<FinancingAndLoanExpense>(x => x.FinancingAndLoansExpenses).WithOne(x => x.User)
            .HasForeignKey(fk => fk.UserId);

            builder.HasMany<VariableExpense>(x => x.VariablesExpenses)
           .WithOne(x => x.User)
           .HasForeignKey(fk => fk.UserId);

            builder.HasMany<CreditCardExpense>(x => x.CreditCardExpenses)
           .WithOne(x => x.User)
           .HasForeignKey(fk => fk.UserId);

            builder.HasMany<CreditCardExpenseInvoice>(x => x.CreditCardExpensesInvoices)
           .WithOne(x => x.User)
           .HasForeignKey(fk => fk.UserId);

            builder.HasMany<Card>(x => x.Cards)
           .WithOne(x => x.User)
           .HasForeignKey(fk => fk.UserId);

            builder.HasMany<BankAccount>(x => x.BankAccounts)
           .WithOne(x => x.User)
           .HasForeignKey(fk => fk.UserId);

        }
    }
    #endregion


}
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Finances
    public class BankAccountFluentApi : IEntityTypeConfiguration<BankAccount>
    {
        public void Configure(EntityTypeBuilder<BankAccount> builder)
        {
            builder.HasMany<Card>(x => x.Cards)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId);

            builder.HasMany<Pix>(x => x.Pixes)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId);

            builder.HasMany<MonthlyFixedExpenseTracking>(x => x.MonthlyFixedExpensesTrackings)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<YearlyFixedExpenseTracking>(x => x.YearlyFixedExpensesTrackings)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<VariableExpense>(x => x.VariablesExpenses)
               .WithOne(x => x.BankAccount)
               .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

        }
    }
    public class MonthlyExpensesFluentApi : IEntityTypeConfiguration<MonthlyFixedExpense>
    {
        public void Configure(EntityTypeBuilder<MonthlyFixedExpense> builder)
        {
            builder.HasMany<MonthlyFixedExpenseTracking>(x => x.MonthlyFixedExpensesTrackings)
            .WithOne(x => x.MonthlyFixedExpense)
            .HasForeignKey(fk => fk.MonthlyFixedExpenseId);

        }

    }
    public class YearlyFixedExpensesFluentApi : IEntityTypeConfiguration<YearlyFixedExpense>
    {
        public void Configure(EntityTypeBuilder<YearlyFixedExpense> builder)
        {
            builder.HasMany<YearlyFixedExpenseTracking>(x => x.YearlyFixedExpensesTrackings)
            .WithOne(x => x.YearlyFixedExpense)
            .HasForeignKey(fk => fk.YearlyFixedExpenseId);

        }

    }
    public class CategoryExpensesFluentApi : IEntityTypeConfiguration<CategoryExpense>
    {
        public void Configure(EntityTypeBuilder<CategoryExpense> builder)
        {

            // builder.Property(x => x.Name).IsRequired(true);
            // builder.HasIndex(x => x.Name).IsUnique(true);

            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);

            builder.HasMany<SubcategoryExpense>(x => x.SubcategoriesExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);

            builder.HasMany<VariableExpense>(x => x.VariablesExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);

        }
    }
    public class SubcategoryExpensesFluentApi : IEntityTypeConfiguration<SubcategoryExpense>
    {
        public void Configure(EntityTypeBuilder<SubcategoryExpense> builder)
        {

            // builder.Property(x => x.Name).IsRequired(true);
            // builder.HasIndex(x => x.Name).IsUnique(true);

            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses).WithOne(x => x.SubcategoryExpense)
            .HasForeignKey(fk => fk.SubcategoryExpenseId);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses).WithOne(x => x.SubcategoryExpense)
                .HasForeignKey(fk => fk.SubcategoryExpenseId);

            builder.HasMany<VariableExpense>(x => x.VariablesExpenses).WithOne(x => x.SubcategoryExpense)
                  .HasForeignKey(fk => fk.SubcategoryExpenseId);


        }
    }
    public class PixFluentApi : IEntityTypeConfiguration<Pix>
    {
        public void Configure(EntityTypeBuilder<Pix> builder)
        {
            builder.HasMany<MonthlyFixedExpenseTracking>(x => x.MonthlyFixedExpensesTrackings)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);

            builder.HasMany<YearlyFixedExpenseTracking>(x => x.YearlyFixedExpensesTrackings)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);

            builder.HasMany<VariableExpense>(x => x.VariableExpenses)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);
        }
    }
    public class CardFluentApi : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder.HasMany<MonthlyFixedExpenseTracking>(x => x.MonthlyFixedExpensesTrackings)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);

            builder.HasMany<YearlyFixedExpenseTracking>(x => x.YearlyFixedExpensesTrackings)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);

            builder.HasMany<VariableExpense>(x => x.VariablesExpenses)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);
        }
    }
    #endregion
}
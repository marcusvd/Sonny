using Domain.Entities.Finances;
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

            builder.HasMany<MonthFixedExpensesTracking>(x => x.MonthFixedExpensesTrackings)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<YearlyFixedExpensesTracking>(x => x.YearlyFixedExpensesTrackings)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<VariableExpenses>(x => x.VariableExpenses)
               .WithOne(x => x.BankAccount)
               .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

        }
    }
    public class MonthExpensesFluentApi : IEntityTypeConfiguration<MonthFixedExpenses>
    {
        public void Configure(EntityTypeBuilder<MonthFixedExpenses> builder)
        {
            builder.HasMany<MonthFixedExpensesTracking>(x => x.MonthFixedExpensesTrackings)
            .WithOne(x => x.MonthFixedExpenses)
            .HasForeignKey(fk => fk.MonthFixedExpensesId);

        }

    }
    public class YearlyFixedExpensesFluentApi : IEntityTypeConfiguration<YearlyFixedExpenses>
    {
        public void Configure(EntityTypeBuilder<YearlyFixedExpenses> builder)
        {
            builder.HasMany<YearlyFixedExpensesTracking>(x => x.YearlyFixedExpensesTrackings)
            .WithOne(x => x.YearlyFixedExpenses)
            .HasForeignKey(fk => fk.YearlyFixedExpensesId);

        }

    }
    public class CategoryExpensesFluentApi : IEntityTypeConfiguration<CategoryExpenses>
    {
        public void Configure(EntityTypeBuilder<CategoryExpenses> builder)
        {

            builder.Property(x => x.Name).IsRequired(true);
            builder.HasIndex(x => x.Name).IsUnique(true);

            builder.HasMany<MonthFixedExpenses>(x => x.MonthFixedExpenses).WithOne(x => x.CategoryExpenses)
            .HasForeignKey(fk => fk.CategoryExpensesId);

            builder.HasMany<YearlyFixedExpenses>(x => x.YearlyFixedExpenses).WithOne(x => x.CategoryExpenses)
            .HasForeignKey(fk => fk.CategoryExpensesId);

            builder.HasMany<SubcategoryExpenses>(x => x.SubcategoriesExpenses).WithOne(x => x.CategoryExpenses)
            .HasForeignKey(fk => fk.CategoryExpensesId);

            builder.HasMany<VariableExpenses>(x => x.VariableExpenses).WithOne(x => x.CategoryExpenses)
            .HasForeignKey(fk => fk.CategoryExpensesId);

        }
    }
    public class SubcategoryExpensesFluentApi : IEntityTypeConfiguration<SubcategoryExpenses>
    {
        public void Configure(EntityTypeBuilder<SubcategoryExpenses> builder)
        {

            builder.Property(x => x.Name).IsRequired(true);
            builder.HasIndex(x => x.Name).IsUnique(true);

            builder.HasMany<MonthFixedExpenses>(x => x.MonthFixedExpenses).WithOne(x => x.SubcategoryExpenses)
            .HasForeignKey(fk => fk.SubcategoryExpensesId);

            builder.HasMany<YearlyFixedExpenses>(x => x.YearlyFixedExpenses).WithOne(x => x.SubcategoryExpenses)
                .HasForeignKey(fk => fk.SubcategoryExpensesId);

            builder.HasMany<VariableExpenses>(x => x.VariableExpenses).WithOne(x => x.SubcategoryExpenses)
                  .HasForeignKey(fk => fk.SubcategoryExpensesId);


        }
    }
    public class PixFluentApi : IEntityTypeConfiguration<Pix>
    {
        public void Configure(EntityTypeBuilder<Pix> builder)
        {
            builder.HasMany<MonthFixedExpensesTracking>(x => x.MonthFixedExpensesTrackings)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);

            builder.HasMany<YearlyFixedExpensesTracking>(x => x.YearlyFixedExpensesTrackings)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);

            builder.HasMany<VariableExpenses>(x => x.VariableExpenses)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);
        }
    }
    public class CardFluentApi : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder.HasMany<MonthFixedExpensesTracking>(x => x.MonthFixedExpensesTrackings)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);

            builder.HasMany<YearlyFixedExpensesTracking>(x => x.YearlyFixedExpensesTrackings)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);

            builder.HasMany<VariableExpenses>(x => x.VariableExpenses)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);
        }
    }
    #endregion
}
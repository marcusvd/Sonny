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

        }
    }
    public class ExpensesFluentApi : IEntityTypeConfiguration<MonthFixedExpenses>
    {
        public void Configure(EntityTypeBuilder<MonthFixedExpenses> builder)
        {
            builder.HasMany<MonthFixedExpensesTracking>(x => x.MonthFixedExpensesTrackings)
            .WithOne(x => x.MonthFixedExpenses)
            .HasForeignKey(fk => fk.MonthFixedExpensesId);

        }
    }

    public class PixFluentApi : IEntityTypeConfiguration<Pix>
    {
        public void Configure(EntityTypeBuilder<Pix> builder)
        {
            builder.HasMany<MonthFixedExpensesTracking>(x => x.MonthFixedExpensesTrackings)
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
        }
    }

    #endregion
}
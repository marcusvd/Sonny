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

            builder.HasMany<FixedExpensesTracking>(x => x.FixedExpensesTrackings)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);
       
        }
    }
    public class ExpensesFluentApi : IEntityTypeConfiguration<FixedExpenses>
    {
        public void Configure(EntityTypeBuilder<FixedExpenses> builder)
        {
            builder.HasMany<FixedExpensesTracking>(x => x.FixedExpensesTrackings)
            .WithOne(x => x.FixedExpenses)
            .HasForeignKey(fk => fk.FixedExpensesId);

        }
    }

    public class EssentialExpensesFluentApi : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder.HasMany<FixedExpensesTracking>(x => x.FixedExpensesTrackings)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);
            
        }
    }
    // public class PixFluentApi : IEntityTypeConfiguration<Pix>
    // {
    //     public void Configure(EntityTypeBuilder<Pix> builder)
    //     {
    //         builder.HasMany<BankAccount>(x => x.pi)
    //         .WithOne(x => x.Card)
    //         .HasForeignKey(fk => fk.CardId).IsRequired(false);
    //     }
    // }

    #endregion
}
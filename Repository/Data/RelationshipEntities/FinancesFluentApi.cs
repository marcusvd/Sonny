using Domain.Entities.Finances;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Finances
    public class BankAccountFluentApi : IEntityTypeConfiguration<FinancialBankAccount>
    {
        public void Configure(EntityTypeBuilder<FinancialBankAccount> builder)
        {
            builder.HasMany<FinancialCard>(x => x.Cards)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId);
        }
    }
    public class FinancialBillToPayListFluentApi : IEntityTypeConfiguration<FinancialBillToPayList>
    {
        public void Configure(EntityTypeBuilder<FinancialBillToPayList> builder)
        {
            builder.HasMany<FinancialEssentialCycle>(x => x.EssentialCycles)
            .WithOne(x => x.BillToPayList)
            .HasForeignKey(fk => fk.BillToPayListId);

            builder.HasMany<FinancialNotPredictable>(x => x.NotPredictables)
            .WithOne(x => x.BillToPayList)
            .HasForeignKey(fk => fk.BillToPayListId).IsRequired(false);
        }
    }
    #endregion
}
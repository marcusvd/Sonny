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
    public class FinancialBillToPayListFluentApi : IEntityTypeConfiguration<FinancialExpenses>
    {
        public void Configure(EntityTypeBuilder<FinancialExpenses> builder)
        {
            builder.HasMany<FinancialEssentialExpenses>(x => x.EssentialExpenses)
            .WithOne(x => x.Expenses)
            .HasForeignKey(fk => fk.ExpensesId);

            builder.HasMany<FinancialExpensesNotPredictable>(x => x.ExpensesNotPredictables)
            .WithOne(x => x.Expenses)
            .HasForeignKey(fk => fk.ExpensesId).IsRequired(false);
        }
    }
    #endregion
}
using Domain.Entities;
using Domain.Entities.BudgetBench;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region BudgetBench
    public class ServiceBudgetFluentApi : IEntityTypeConfiguration<ServiceBudget>
    {
        public void Configure(EntityTypeBuilder<ServiceBudget> builder)
        {
            builder.HasMany<SolutionPrice>(x => x.SolutionsPrices).WithOne(x => x.ServiceBudget).HasForeignKey(fk => fk.ServiceBudgetId);
            builder.HasOne<Customer>(x => x.Customer).WithMany(x => x.ServicesBudgets).HasForeignKey(fk => fk.CustomerId);
        }
    }

    public class ServiceBenchFluentApi : IEntityTypeConfiguration<ServiceBench>
    {
        public void Configure(EntityTypeBuilder<ServiceBench> builder)
        {
            builder.HasMany<BenchToCashBox>(x => x.ListBenchToCashBox).WithOne(x => x.ServiceBench).HasForeignKey(fk => fk.ServiceBenchId);
            builder.HasOne<Customer>(x => x.Customer).WithMany(x => x.ServicesBenchs).HasForeignKey(x => x.CustomerId);
        }
    }

    #endregion
}
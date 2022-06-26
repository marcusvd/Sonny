using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    public class ServiceBudgetFluentApi : IEntityTypeConfiguration<ServiceBudget>
    {
        public void Configure(EntityTypeBuilder<ServiceBudget> builder)
        {

            builder.HasMany<SolutionPrice>(i => i.SolutionsPrices).WithOne(s => s.ServiceBudget).HasForeignKey(fk => fk.ServiceBudgetId);

            builder.HasOne<ClientEntity>(i => i.Client).WithMany(sb => sb.ServicesBudgets).HasForeignKey(fk => fk.ClientId);

        }
    }

    public class SolutionPriceFluent : IEntityTypeConfiguration<SolutionPrice>
    {
        public void Configure(EntityTypeBuilder<SolutionPrice> builder)
        {
            builder.HasKey(id => id.Id);
        }
    }

    public class SupplierTypePaymentFluentApi : IEntityTypeConfiguration<SupplierTypePayment>
    {
        public void Configure(EntityTypeBuilder<SupplierTypePayment> builder)
        {
            builder.HasKey(st => new { st.SupplierId, st.TypePaymentId });
        }
    }


    public class CollectDeliverFluentApi : IEntityTypeConfiguration<CollectDeliver>
    {
        public void Configure(EntityTypeBuilder<CollectDeliver> builder)
        {
            builder.HasKey(id => id.Id);
            builder.HasOne(c => c.DestinyAddress).WithMany(c => c.CollectsDelivers).HasForeignKey(fk => fk.DestinyAddressId).IsRequired(true);
            builder.HasOne(c => c.SourceAddress).WithMany(c => c.CollectsDelivers).HasForeignKey(fk => fk.SourceAddressId).IsRequired(true);
        }
    }

    public class ClientEntityFluentApi : IEntityTypeConfiguration<ClientEntity>
    {
        public void Configure(EntityTypeBuilder<ClientEntity> builder)
        {
            builder.HasKey(id => id.Id);

            builder.HasMany<NetworkDevice>(n => n.NetworksDevices).WithOne(c => c.Client).HasForeignKey(fk => fk.ClientId);
            builder.HasMany<ServiceBudget>(n => n.ServicesBudgets).WithOne(c => c.Client).HasForeignKey(fk => fk.ClientId);
            
        }
    }


    // public class DestinyCollectDeliverFluentApi : IEntityTypeConfiguration<DestinyCollectDeliver>
    // {
    //     public void Configure(EntityTypeBuilder<DestinyCollectDeliver> builder)
    //     {
    //         builder.HasKey(id => id.Id);

    //     }
    // }



}
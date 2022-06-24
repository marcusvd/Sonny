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
            builder.HasOne<ClientEntity>(c => c.SourceClient).WithMany(c => c.CollectsDelivers).HasForeignKey(fk => fk.SourceClientId);
            builder.HasOne<ClientEntity>(c => c.DestinyClient).WithMany(c => c.CollectsDelivers).HasForeignKey(fk => fk.DestinyClientId);

            builder.HasOne<Partner>(p => p.SourcePartner).WithMany(c => c.CollectsDelivers).HasForeignKey(fk => fk.SourcePartnerId);
            builder.HasOne<Partner>(p => p.SourcePartner).WithMany(c => c.CollectsDelivers).HasForeignKey(fk => fk.SourcePartnerId);


        }
    }

    public class ClientEntityFluentApi : IEntityTypeConfiguration<ClientEntity>
    {
        public void Configure(EntityTypeBuilder<ClientEntity> builder)
        {
          builder.HasKey(id => id.Id);
          builder.HasMany<NetworkDevices>(n => n.NetWorkDevices).WithOne(c => c.Client).HasForeignKey(fk => fk.ClientId);
          builder.HasMany<ServiceBudget>(n => n.ServicesBudgets).WithOne(c => c.Client).HasForeignKey(fk => fk.ClientId);
        //   builder.HasMany<CollectDeliver>(n => n.CollectsDelivers).WithOne(c => c.SourceClient).HasForeignKey(fk => fk.SourceClientId);
        //   builder.HasMany<CollectDeliver>(n => n.CollectsDelivers).WithOne(c => c.DestinyClient).HasForeignKey(fk => fk.DestinyClientId);
        }
    }

       



}
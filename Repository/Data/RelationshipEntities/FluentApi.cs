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
            builder.HasKey(ids => ids.Id);
          
            // builder.HasOne<SourceCollectDeliver>(scd => scd.SourceAddress)
            // .WithMany(scd => scd.CollectsDelivers).HasForeignKey(fk => fk.DestinyAddressId);

            // builder.HasOne<DestinyCollectDeliver>(scd => scd.DestinyAddress)
            // .WithMany(scd => scd.CollectsDelivers).HasForeignKey(fk => fk.DestinyAddressId);

            // builder.HasOne<Partner>(cd => cd.Transporter).WithOne().HasForeignKey<CollectDeliver>(fk => fk.TransporterId);
        }
    }
    public class DestinyCollectDeliverFluentApi : IEntityTypeConfiguration<DestinyCollectDeliver>
    {
        public void Configure(EntityTypeBuilder<DestinyCollectDeliver> builder)
        {
            builder.HasKey(id => id.Id);

            builder.HasOne<ClientEntity>(i => i.Client).WithMany(c => c.DestinyCollectDelivers).HasForeignKey(fk => fk.ClientId);
            builder.HasOne<Partner>(i => i.Partner).WithMany(c => c.DestinyCollectDelivers).HasForeignKey(fk => fk.PartnerId);
        }
    }

    public class SourceCollectDeliverFluentApi : IEntityTypeConfiguration<SourceCollectDeliver>
    {
        public void Configure(EntityTypeBuilder<SourceCollectDeliver> builder)
        {
           builder.HasKey(id => id.Id);
            builder.HasOne<ClientEntity>(i => i.Client).WithMany(c => c.SourceCollectDelivers).HasForeignKey(fk => fk.ClientId);
            builder.HasOne<Partner>(i => i.Partner).WithMany(c => c.SourceCollectDelivers).HasForeignKey(fk => fk.PartnerId);
        }
    }



    // public class ClientEntityFluentApi : IEntityTypeConfiguration<ClientEntity>
    // {
    //     public void Configure(EntityTypeBuilder<ClientEntity> builder)
    //     {
    //         builder.HasKey(id => id.Id);
    //         builder.HasMany<NetworkDevice>(n => n.NetworksDevices).WithOne(c => c.Client).HasForeignKey(fk => fk.ClientId);
    //         builder.HasMany<ServiceBudget>(n => n.ServicesBudgets).WithOne(c => c.Client).HasForeignKey(fk => fk.ClientId);


    //     }
    // }


    public class PartnerFluentApi : IEntityTypeConfiguration<Partner>
    {
        public void Configure(EntityTypeBuilder<Partner> builder)
        {
            builder.HasKey(id => id.Id);
            builder.HasMany(dcd => dcd.CollectsDelivers)
            .WithOne(p => p.Transporter)
            .HasForeignKey(x => x.TransporterId).OnDelete(DeleteBehavior.SetNull);



                }
            }






}
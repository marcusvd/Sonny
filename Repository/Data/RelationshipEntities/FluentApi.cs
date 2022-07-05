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
    public class InventoryFluentApi : IEntityTypeConfiguration<Inventory>
    {
        public void Configure(EntityTypeBuilder<Inventory> builder)
        {
          builder.HasKey(id => id.Id);
          builder.HasOne<Equipament>(e => e.Equipament).WithMany(i => i.Inventories).HasForeignKey(fk => fk.EquipamentId);
          builder.HasOne<Partner>(e => e.Partner).WithMany(i => i.Inventories).HasForeignKey(fk => fk.PartnerId);
        }
    }
    // public class SupplierTypePaymentFluentApi : IEntityTypeConfiguration<SupplierTypePayment>
    // {
    //     public void Configure(EntityTypeBuilder<SupplierTypePayment> builder)
    //     {
    //         builder.HasKey(st => new { st.SupplierId, st.TypePaymentId });
    //     }
    // }

    public class CollectDeliverFluentApi : IEntityTypeConfiguration<CollectDeliver>
    {
        public void Configure(EntityTypeBuilder<CollectDeliver> builder)
        {
            builder.HasKey(ids => ids.Id);

            //Client
            builder.HasOne<ClientEntity>(c => c.DestinyClient).WithMany(cd => cd.DestinyCollectDelivers).HasForeignKey(fk => fk.DestinyClientId).IsRequired(false);
            builder.HasOne<ClientEntity>(c => c.SourceClient).WithMany(cd => cd.SourceCollectDelivers).HasForeignKey(fk => fk.SourceClientId).IsRequired(false);
            //Partner
            builder.HasOne<Partner>(p => p.DestinyPartner).WithMany(cd => cd.DestinyCollectDelivers).HasForeignKey(fk => fk.DestinyPartnerId).IsRequired(false);
            builder.HasOne<Partner>(p => p.SourcePartner).WithMany(cd => cd.SourceCollectDelivers).HasForeignKey(fk => fk.SourcePartnerId).IsRequired(false);
            //PartnerCompany
            builder.HasOne<Company>(p => p.DestinyCompany).WithMany(cd => cd.DestinyCollectsDelivers).HasForeignKey(fk => fk.DestinyCompanyId).IsRequired(false);
            builder.HasOne<Company>(p => p.SourceCompany).WithMany(cd => cd.SourceCollectsDelivers).HasForeignKey(fk => fk.SourceCompanyId).IsRequired(false);
            //Partner Transporter
            builder.HasOne<Partner>(p => p.Transporter).WithMany(cd => cd.TransporterCollectDelivers).HasForeignKey(fk => fk.TransporterId).IsRequired(false);




        }
    }

    public class CompanyFluentApi : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasOne<Address>(a => a.Address).WithMany(c => c.Companies).HasForeignKey(fk => fk.AddressId);
            builder.HasOne<Contact>(a => a.Contact).WithMany(c => c.Companies).HasForeignKey(fk => fk.ContactId);
        }
        // public class DestinyCollectDeliverFluentApi : IEntityTypeConfiguration<DestinyCollectDeliver>
        // {
        //     public void Configure(EntityTypeBuilder<DestinyCollectDeliver> builder)
        //     {
        //         builder.HasKey(id => id.Id);

        //         builder.HasOne<ClientEntity>(i => i.Client).WithMany(c => c.DestinyCollectDelivers).HasForeignKey(fk => fk.ClientId);
        //         builder.HasOne<Partner>(i => i.Partner).WithMany(c => c.DestinyCollectDelivers).HasForeignKey(fk => fk.PartnerId);
        //     }
        // }

        // public class SourceCollectDeliverFluentApi : IEntityTypeConfiguration<SourceCollectDeliver>
        // {
        //     public void Configure(EntityTypeBuilder<SourceCollectDeliver> builder)
        //     {
        //        builder.HasKey(id => id.Id);
        //         builder.HasOne<ClientEntity>(i => i.Client).WithMany(c => c.SourceCollectDelivers).HasForeignKey(fk => fk.ClientId);
        //         builder.HasOne<Partner>(i => i.Partner).WithMany(c => c.SourceCollectDelivers).HasForeignKey(fk => fk.PartnerId);
        //     }
        // }



        // public class ClientEntityFluentApi : IEntityTypeConfiguration<ClientEntity>
        // {
        //     public void Configure(EntityTypeBuilder<ClientEntity> builder)
        //     {
        //         builder.HasKey(id => id.Id);
        //         builder.HasMany<NetworkDevice>(n => n.NetworksDevices).WithOne(c => c.Client).HasForeignKey(fk => fk.ClientId);
        //         builder.HasMany<ServiceBudget>(n => n.ServicesBudgets).WithOne(c => c.Client).HasForeignKey(fk => fk.ClientId);


        //     }
        // }


        // public class PartnerFluentApi : IEntityTypeConfiguration<Partner>
        // {
        //     public void Configure(EntityTypeBuilder<Partner> builder)
        //     {
        //         builder.HasKey(id => id.Id);
        //         builder.HasMany(dcd => dcd.CollectsDelivers)
        //         .WithOne(p => p.Transporter)
        //         .HasForeignKey(x => x.TransporterId).OnDelete(DeleteBehavior.SetNull);



        //     }
        // }






    }
}
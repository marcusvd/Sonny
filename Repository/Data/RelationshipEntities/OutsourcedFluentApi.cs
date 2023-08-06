using Domain.Entities;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region EletronicRepair
    public class EletronicRepairFluentApi : IEntityTypeConfiguration<ElectronicRepair>
    {
        public void Configure(EntityTypeBuilder<ElectronicRepair> builder)
        {

            builder.HasOne<Customer>(x => x.Customer)
            .WithMany(x => x.ElectronicsRepairs).HasForeignKey(x => x.CustomerId);

            builder.HasOne<Partner>(x => x.Partner)
            .WithMany(x => x.ElectronicsRepairs).HasForeignKey(x => x.PartnerId);

        }
    }
    #endregion

    #region CollectionDelivery
    public class CollectDeliverFluentApi : IEntityTypeConfiguration<CollectDeliver>
    {
        public void Configure(EntityTypeBuilder<CollectDeliver> builder)
        {
            builder.HasKey(ids => ids.Id);

            builder.HasOne<Company>(x => x.Company)
                       .WithMany(x => x.CollectsDelivers)
                       .HasForeignKey(x => x.CompanyId).IsRequired(true);

            builder.HasOne<Partner>(x => x.Transporter)
            .WithMany(x => x.CollectDelivers)
            .HasForeignKey(x => x.TransporterId);

            builder.HasMany<Destiny>(x => x.Destinies)
            .WithOne(x => x.CollectDeliver)
            .HasForeignKey(x => x.CollectDeliverId);


            // builder.HasOne<BillingFrom>(x => x.BillingFrom).WithOne()
            // .HasForeignKey<BillingFrom>(x=>x.CollectDeliverId).IsRequired(true);


        }
    }
    #endregion
    
    // #region Destinies
    // public class DestinyFluentApi : IEntityTypeConfiguration<Destiny>
    // {
    //     public void Configure(EntityTypeBuilder<Destiny> builder)
    //     {
    //      builder.HasMany<CollectDeliver>(x=> x.CollectsDelivers).WithOne(x=>x.Destinies)
    //      .HasForeignKey(x=> x.DestiniesId);
    //     }
    // }
    // #endregion

}
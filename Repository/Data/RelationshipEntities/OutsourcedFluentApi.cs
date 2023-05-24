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
            .HasForeignKey(x => x.TransporterId).IsRequired(false);


            builder.HasOne<ChargeForm>(x => x.ChargeForm).WithOne(x => x.CollectDeliver)
            .HasForeignKey<ChargeForm>(x=>x.CollectDeliverId).IsRequired(true);


        }
    }
    #endregion
    #region ChargeForm
    public class ChargeFormFluentApi : IEntityTypeConfiguration<ChargeForm>
    {
        public void Configure(EntityTypeBuilder<ChargeForm> builder)
        {
            builder.HasKey(ids => ids.Id);


            // builder.HasOne<Partner>().WithOne()
            // .HasForeignKey<ChargeForm>(x => x.PartnerId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            
            // builder.HasOne<Customer>().WithOne()
            // .HasForeignKey<ChargeForm>(x => x.CustomerId).IsRequired(false);


           


        }
    }
    #endregion

}
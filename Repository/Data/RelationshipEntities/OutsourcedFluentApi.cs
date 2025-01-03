using Domain.Entities;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Partners;
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
            // builder.HasOne<Customer>(x => x.Customer)
            // .WithMany(x => x.ElectronicsRepairs).HasForeignKey(x => x.CustomerId);

            builder.HasOne<Partner>(x => x.ServiceProvider)
            .WithMany(x => x.ElectronicsRepairs).HasForeignKey(x => x.ServiceProviderId);
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
            .WithMany(x => x.CollectDeliversTransporters)
            .HasForeignKey(x => x.TransporterId);
        }
    }
    #endregion
    #region BillingFrom
    public class BillingFromFluentApi : IEntityTypeConfiguration<BillingFrom>
    {
        public void Configure(EntityTypeBuilder<BillingFrom> builder)
        {
            builder.Ignore(x=> x.User);
            builder.Ignore(x=> x.UserId);
        }
    }
    #endregion
    #region Destiny
    public class DestinyFluentApi : IEntityTypeConfiguration<Destiny>
    {
        public void Configure(EntityTypeBuilder<Destiny> builder)
        {
            builder.Ignore(x=> x.User);
            builder.Ignore(x=> x.UserId);
        }
    }
    #endregion
    

}
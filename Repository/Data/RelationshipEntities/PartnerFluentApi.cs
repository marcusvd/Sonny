using Domain.Entities;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Domain.Entities.Stocks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Partner
    public class PartnerFluentApi : IEntityTypeConfiguration<Partner>
    {
        public void Configure(EntityTypeBuilder<Partner> builder)
        {
            builder.HasMany<BillingFrom>(x => x.BillingFromCollectsDelivers).WithOne(x => x.Partner)
            .HasForeignKey(x => x.PartnerId);

            builder.HasMany<Destiny>(x => x.Destinies).WithOne(x => x.Partner)
                       .HasForeignKey(fk => fk.PartnerId).IsRequired(false);
                       
            builder.HasMany<Product>(x => x.Products).WithOne(x => x.Supplier)
            .HasForeignKey(x => x.SupplierId);
        }
    }

    #endregion

}
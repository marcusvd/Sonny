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
            builder.HasMany<ChargeForm>(x => x.ChargesForms).WithOne(x => x.Partner)
            .HasForeignKey(x=>x.PartnerId);

            builder.HasMany<Product>(x => x.Products).WithOne(x => x.Supplier)
            .HasForeignKey(x => x.SupplierId);
        }
    }

    #endregion
  
}
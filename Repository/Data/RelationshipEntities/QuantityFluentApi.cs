using Domain.Entities;
using Domain.Entities.Authentication;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Domain.Entities.Stocks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
   #region Quantity
    public class QuantityFluentApi : IEntityTypeConfiguration<Quantity>
    {
        public void Configure(EntityTypeBuilder<Quantity> builder)
        {
          

            // builder.HasOne<Partner>(x => x.Supplier).WithMany(x => x.Quantitys)
            // .HasForeignKey(fk => fk.SupplierId);

        }
    }

    #endregion
  
}
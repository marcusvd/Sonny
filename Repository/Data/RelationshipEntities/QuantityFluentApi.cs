using Domain.Entities;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Domain.Entities.StkProduct;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Quantity
    public class QuantityFluentApi : IEntityTypeConfiguration<Quantity>
    {
        public void Configure(EntityTypeBuilder<Quantity> builder)
        {
            builder.HasIndex(x => x.Sn).IsUnique(true);
            builder.Property(x=> x.Sn).IsRequired(true);
            builder.Property(x=> x.CustomerId).IsRequired(false);
            builder.Property(x=> x.ReservedOrSoldByUserId).IsRequired(false);
        }
    }

    #endregion

}
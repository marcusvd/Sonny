using Domain.Entities.Fill.StkProduct;
using Domain.Entities.StkProduct;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Product
    public class ProductFluentApi : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasMany<Tracking>(x => x.Trackings).WithOne(x => x.Product)
            .HasForeignKey(x => x.ProductId);
        }
    }

    #endregion

    #region Equipament
    public class EquipamentFluentApi : IEntityTypeConfiguration<Equipament>
    {
        public void Configure(EntityTypeBuilder<Equipament> builder)
        {
            builder.Property(x => x.Model).IsRequired(true);
            builder.HasIndex(x => x.Model).IsUnique(true);
        }
    }

    #endregion
    #region Equipament_Fill
    public class EquipamentFillFluentApi : IEntityTypeConfiguration<Equipament_Fill>
    {
        public void Configure(EntityTypeBuilder<Equipament_Fill> builder)
        {
            builder.Property(x => x.Equipament).IsRequired(true);
            builder.HasIndex(x => x.Equipament).IsUnique(true);
        }
    }

    #endregion
    #region Manufacturer_Fill
    public class ManufacturerFillFluentApi : IEntityTypeConfiguration<Manufacturer_Fill>
    {
        public void Configure(EntityTypeBuilder<Manufacturer_Fill> builder)
        {
            builder.Property(x => x.Manufacturer).IsRequired(true);
            builder.HasIndex(x => x.Manufacturer).IsUnique(true);
        }
    }

    #endregion
    #region Segment_Fill
    public class SegmentFillFluentApi : IEntityTypeConfiguration<Segment_Fill>
    {
        public void Configure(EntityTypeBuilder<Segment_Fill> builder)
        {
            builder.Property(x => x.Segment).IsRequired(true);
            builder.HasIndex(x => x.Segment).IsUnique(true);
        }
    }

    #endregion

}
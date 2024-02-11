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
    #region Item_Fill
    public class ItemFillFluentApi : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasMany<Manufacturer>(x => x.Manufacturers).WithOne(x => x.Item).HasForeignKey(fk => fk.ItemId);
            // builder.HasMany<Model>(x => x.Models).WithOne(x => x.Item).HasForeignKey(fk => fk.ItemId);
            builder.HasMany<Segment>(x => x.Segments).WithOne(x => x.Item).HasForeignKey(fk => fk.ItemId);
            builder.Property(x => x.Name).IsRequired(true);
            builder.HasIndex(x => x.Name).IsUnique(true);
        }
    }

    #endregion


    #region Manufacturer_Fill
    public class ManufacturerFillFluentApi : IEntityTypeConfiguration<Manufacturer>
    {
        public void Configure(EntityTypeBuilder<Manufacturer> builder)
        {
            builder.Property(x => x.Name).IsRequired(true);
            // builder.HasIndex(x => x.Name).IsUnique(true);
        }
    }

    #endregion

    #region Model_Fill
    public class ModelFillFluentApi : IEntityTypeConfiguration<Model>
    {
        public void Configure(EntityTypeBuilder<Model> builder)
        {
            builder.Property(x => x.Name).IsRequired(true);
            // builder.HasIndex(x => x.Name).IsUnique(true);
        }
    }
    #endregion
    #region Segment_Fill
    public class SegmentFillFluentApi : IEntityTypeConfiguration<Segment>
    {
        public void Configure(EntityTypeBuilder<Segment> builder)
        {
            builder.Property(x => x.Name).IsRequired(true);
            // builder.HasIndex(x => x.Name).IsUnique(true);
        }
    }

    #endregion


}
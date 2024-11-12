using Domain.Entities.StockProduct;
using Domain.Entities.StockProduct.ProductKind;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Stock
    public class StockFluentApi : IEntityTypeConfiguration<Stock>
    {
        public void Configure(EntityTypeBuilder<Stock> builder)
        {
            builder.HasMany<ItemProduct>(x => x.ItemsProducts).WithOne(x => x.Stock)
            .HasForeignKey(x => x.StockId);
        }
    }

    #endregion

    #region ProductType
    public class ProductTypeFluentApi : IEntityTypeConfiguration<ProductType>
    {
        public void Configure(EntityTypeBuilder<ProductType> builder)
        {
            //RelationShip
            builder.HasMany<Segment>(x => x.Segments).WithOne(x => x.ProductType).HasForeignKey(fk => fk.ProductTypeId);
            //Properties
            builder.Property(x => x.Name).IsRequired(true);
            builder.Property(x => x.Name).HasMaxLength(100);
            builder.HasIndex(x => x.Name).IsUnique(true);

            builder.Ignore(x => x.User);
            builder.Ignore(x => x.UserId);

        }
    }

    #endregion


    #region Manufacturer
    public class ManufacturerFluentApi : IEntityTypeConfiguration<Manufacturer>
    {
        public void Configure(EntityTypeBuilder<Manufacturer> builder)
        {
            builder.HasMany<Model>(x => x.Models).WithOne(x => x.Manufacturer).HasForeignKey(fk => fk.ManufacturerId);
            //Properties
            builder.Property(x => x.Name).IsRequired(true);
            builder.Property(x => x.Name).HasMaxLength(100);

            builder.Ignore(x => x.User);
            builder.Ignore(x => x.UserId);
        }
    }

    #endregion

    #region Segment
    public class SegmentFluentApi : IEntityTypeConfiguration<Segment>
    {
        public void Configure(EntityTypeBuilder<Segment> builder)
        {
             //builder.HasMany<Model>(x => x.Manufacturers).WithOne(x => x.Segment).HasForeignKey(fk => fk.SegmentId);
            //Properties
            builder.Property(x => x.Name).IsRequired(true);
            builder.Property(x => x.Name).HasMaxLength(100);

            builder.Ignore(x => x.User);
            builder.Ignore(x => x.UserId);
        }
    }

    #endregion

    #region Model
    public class ModelFluentApi : IEntityTypeConfiguration<Model>
    {
        public void Configure(EntityTypeBuilder<Model> builder)
        {
            builder.Property(x => x.Name).IsRequired(true);
            builder.HasIndex(x => x.Name).IsUnique(true);

            builder.Ignore(x => x.User);
            builder.Ignore(x => x.UserId);
        }
    }
    #endregion



}
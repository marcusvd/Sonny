using Domain.Entities.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Manufacturer
    public class ManufacturerFluentApi : IEntityTypeConfiguration<Manufacturer>
    {
        public void Configure(EntityTypeBuilder<Manufacturer> builder)
        {
            builder.HasMany<Product>(x => x.Products).WithOne(x => x.Manufacturer)
            .HasForeignKey(x => x.ManufacturerId);

            // builder.HasMany<Model>(x => x.Models).WithOne(x => x.Manufacturer)
            // .HasForeignKey(x => x.ManufacturerId);

        }

    }

    #endregion

}
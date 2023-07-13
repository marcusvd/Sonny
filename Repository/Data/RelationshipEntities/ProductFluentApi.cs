using Domain.Entities;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Domain.Entities.Stocks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
   #region Product
    public class ProductFluentApi : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasMany<ProductHistory>(x => x.ProductsHistories).WithOne(x => x.Product)
            .HasForeignKey(x=>x.ProductId);

        }
    }

    #endregion
  
}
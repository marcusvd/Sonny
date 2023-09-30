using Domain.Entities.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Stock
    public class StockFluentApi : IEntityTypeConfiguration<Stock>
    {
        public void Configure(EntityTypeBuilder<Stock> builder)
        {
            builder.HasMany<Product>(x => x.Products).WithOne(x => x.Stock)
            .HasForeignKey(x => x.StockId);

        }
    }

    #endregion

}
using Domain.Entities;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Domain.Entities.Stocks;
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

    //         builder.HasOne<Company>(x => x.Company).WithOne()
    //    .HasForeignKey<Company>(fk => fk.Id);
        }
    }

    #endregion

}
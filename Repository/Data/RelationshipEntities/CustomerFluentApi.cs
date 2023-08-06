using Domain.Entities;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.Stocks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    #region Customer
    public class CustomerFluentApi : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasMany<Tracking>(x => x.Trackings).WithOne(x => x.Customer)
            .HasForeignKey(x=>x.CustomerId);

            builder.HasMany<Destiny>(x=> x.Destinies).WithOne(x=>x.Customer)
            .HasForeignKey(fk =>fk.CustomerId).IsRequired(false);
            
            builder.HasMany<Quantity>(x => x.Quantities).WithOne(x => x.Customer)
            .HasForeignKey(x=>x.CustomerId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
        }

    }

    #endregion

}
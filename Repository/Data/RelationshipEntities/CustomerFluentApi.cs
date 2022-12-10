using Domain.Entities;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    #region Customer
    public class InventoryFluentApi : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasMany<CollectDeliver>
            (x => x.CollectsDelivers).WithOne(x => x.Customer)
            .HasForeignKey(x => x.CustomerId);
        }

    }

    #endregion

}
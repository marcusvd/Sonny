using Domain.Entities.Outsourced;
using Domain.Entities.Product;
using Domain.Entities.ServicesBench;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;

namespace Repository.Data.RelationshipEntities
{

    #region Customer
    public class CustomerFluentApi : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasMany<Tracking>(x => x.Trackings).WithOne(x => x.Customer)
            .HasForeignKey(x=>x.CustomerId);

            builder.HasMany<Destiny>(x=> x.CollectDeliverDestinies).WithOne(x=>x.Customer)
            .HasForeignKey(fk =>fk.CustomerId).IsRequired(false);
            
            builder.HasMany<Quantity>(x => x.ProductsQuantities).WithOne(x => x.Customer)
            .HasForeignKey(x=>x.CustomerId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            
            builder.HasMany<BudgetService>(x => x.ServicesExecuted).WithOne(x => x.Customer)
            .HasForeignKey(x=>x.CustomerId);
        }

    }

    #endregion

}
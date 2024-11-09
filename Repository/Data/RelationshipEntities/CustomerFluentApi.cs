using Domain.Entities.Outsourced;
using Domain.Entities.StkProduct;
using Domain.Entities.ServicesBench;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Finances;

namespace Repository.Data.RelationshipEntities
{

    #region Customer
    public class CustomerFluentApi : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            // builder.HasMany<Tracking>(x => x.Trackings).WithOne(x => x.Customer)
            // .HasForeignKey(x=>x.CustomerId);

            builder.HasMany<Destiny>(x=> x.CollectDeliverDestinies).WithOne(x=>x.Customer)
            .HasForeignKey(fk =>fk.CustomerId).IsRequired(false);
            
            builder.HasMany<Quantity>(x => x.ProductsQuantities).WithOne(x => x.Customer)
            .HasForeignKey(x=>x.CustomerId).IsRequired(false).OnDelete(DeleteBehavior.SetNull);
            
            // builder.HasMany<BudgetService>(x => x.ServicesExecuted).WithOne(x => x.Customer)
            // .HasForeignKey(x=>x.CustomerId);
        }

    }

    #endregion

    #region Customer
    public class AdditionalCostsFluentApi : IEntityTypeConfiguration<AdditionalCosts>
    {
        public void Configure(EntityTypeBuilder<AdditionalCosts> builder)
        {
            builder.Ignore(x=> x.UserId);
            builder.Ignore(x=> x.User);
        }

    }

    #endregion

}
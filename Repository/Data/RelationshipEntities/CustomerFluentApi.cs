using Domain.Entities;
using Domain.Entities.Outsourced;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    #region Customer
    public class CustomerFluentApi : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasMany<ChargeForm>(x => x.ChargesForms).WithOne(x => x.Customer)
            .HasForeignKey(x=>x.CustomerId);
        }

    }

    #endregion

}
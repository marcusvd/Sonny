using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    #region Company
    public class CompanyFluentApi : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasMany<CollectDeliver>
            (x => x.CollectsDelivers).WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId)
            .IsRequired(false);

            // builder.HasMany<MyUser>()
            // .WithOne()
            // .HasForeignKey(fk => fk.CompanyId)
            // .IsRequired(false);

        }
    }

    #endregion


}
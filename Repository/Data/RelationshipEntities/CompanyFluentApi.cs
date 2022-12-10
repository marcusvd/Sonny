using Domain.Entities;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    
    #region Company
    public class CompanyFluentApi : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasMany<CollectDeliver>
            (x => x.CollectsDelivers).WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId);
        }
    }

    #endregion
    

}
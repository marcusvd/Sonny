using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Main.Inheritances;

namespace Repository.Data.RelationshipEntities
{

    #region PhysicallyMovingCosts
    public class PhysicallyMovingCostsFluentApi : IEntityTypeConfiguration<PhysicallyMovingCosts>
    {
        public void Configure(EntityTypeBuilder<PhysicallyMovingCosts> builder)
        {
            builder.Ignore(x => x.UserId);
            builder.Ignore(x => x.User);
        }

    }

    #endregion

}
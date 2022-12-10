using Domain.Entities.Financial;
using Domain.Entities.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Financial
    public class CheckingAccountFluentApi : IEntityTypeConfiguration<CheckingAccount>
    {
        public void Configure(EntityTypeBuilder<CheckingAccount> builder)
        {
            builder.HasMany<Card>(x => x.Cards).WithOne(x => x.CheckingAccount).HasForeignKey(fk => fk.CheckingAccountId);
        }
    }
    #endregion
}
using Domain.Entities;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Domain.Entities.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Quantity
    public class EquipamentTypeFluentApi : IEntityTypeConfiguration<EquipamentType>
    {
        public void Configure(EntityTypeBuilder<EquipamentType> builder)
        {
            builder.Property(x=>x.Name).IsRequired(true);
            builder.HasIndex(x => x.Name).IsUnique(true);
        }
    }

    #endregion

}
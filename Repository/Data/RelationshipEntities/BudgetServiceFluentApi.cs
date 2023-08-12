using Domain.Entities;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.Stocks;
using Domain.Entities.ServicesBench;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    #region ServicesPrices
    public class ServiceFluentApi : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.HasMany<Price>(x => x.Prices)
         .WithOne(x => x.Service).HasForeignKey(x => x.ServiceId);
        }
    }
    #endregion
}
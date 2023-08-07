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
    public class ServicesPricesFluentApi : IEntityTypeConfiguration<ServicesPrices>
    {
        public void Configure(EntityTypeBuilder<ServicesPrices> builder)
        {
            builder.HasKey(x => new {x.PriceId, x.ServiceId});
        }
    }

    #endregion

}
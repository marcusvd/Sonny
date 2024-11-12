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
            builder.HasMany<Repair>(x => x.Repairs)
         .WithOne(x => x.Service).HasForeignKey(x => x.ServiceId);
        }
    }
    #endregion
    #region TableProvidedServicesPrice
    public class TableProvidedServicesPriceFluentApi : IEntityTypeConfiguration<TableProvidedServicePrice>
    {
        public void Configure(EntityTypeBuilder<TableProvidedServicePrice> builder)
        {
            builder.Property(x => x.ServiceName).IsRequired(true);
            builder.HasIndex(x => x.ServiceName).IsUnique(true);
        }


    }
    #endregion
    #region BudgetService
    // public class BudgetServiceFluentApi : IEntityTypeConfiguration<BudgetService>
    // {
    //     public void Configure(EntityTypeBuilder<BudgetService> builder)
    //     {
    //         builder.HasMany<Tracking>(x => x.HardwareIncludedInServices)
    //          .WithOne(x => x.Service).HasForeignKey(x => x.ServiceId).IsRequired(false);
    //     }


    // }
    #endregion

}
using Domain.Entities;
using Domain.Entities.BudgetBench;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{

    // #region Customer
    // public class InventoryFluentApi : IEntityTypeConfiguration<Inventory>
    // {
    //     public void Configure(EntityTypeBuilder<Inventory> builder)
    //     {
    //         builder.HasOne(x => x.Partner).WithOne(x => x.Inventories).HasForeignKey(fk => fk.);
    //     }

    // }

    // #endregion


    #region BudgetBench
    public class ServiceBudgetFluentApi : IEntityTypeConfiguration<ServiceBudget>
    {
        public void Configure(EntityTypeBuilder<ServiceBudget> builder)
        {
            builder.HasMany<SolutionPrice>(x => x.SolutionsPrices).WithOne(x => x.ServiceBudget).HasForeignKey(fk => fk.ServiceBudgetId);
            builder.HasOne<Customer>(x => x.Customer).WithMany(x => x.ServicesBudgets).HasForeignKey(fk => fk.CustomerId);
        }
    }

    public class ServiceBenchFluentApi : IEntityTypeConfiguration<ServiceBench>
    {
        public void Configure(EntityTypeBuilder<ServiceBench> builder)
        {
            builder.HasMany<BenchToCashBox>(x => x.ListBenchToCashBox).WithOne(x => x.ServiceBench).HasForeignKey(fk => fk.ServiceBenchId);
            builder.HasOne<Customer>(x => x.Customer).WithMany(x => x.ServicesBenchs).HasForeignKey(x => x.CustomerId);
        }
    }

    #endregion

    #region Financial


    public class CheckingAccountFluentApi : IEntityTypeConfiguration<CheckingAccount>
    {
        public void Configure(EntityTypeBuilder<CheckingAccount> builder)
        {
            builder.HasMany<Card>(x => x.Cards).WithOne(x => x.CheckingAccount).HasForeignKey(fk => fk.CheckingAccountId);
        }
    }
    #endregion

    #region CollectionDelivery
    public class CollectDeliverFluentApi : IEntityTypeConfiguration<CollectDeliver>
    {
        public void Configure(EntityTypeBuilder<CollectDeliver> builder)
        {
            builder.HasKey(ids => ids.Id);
            //Customer
            builder.HasOne<Customer>(c => c.DestinyCustomer).WithMany(cd => cd.DestinyCollectDelivers).HasForeignKey(fk => fk.DestinyCustomerId).IsRequired(false);
            builder.HasOne<Customer>(c => c.SourceCustomer).WithMany(cd => cd.SourceCollectDelivers).HasForeignKey(fk => fk.SourceCustomerId).IsRequired(false);
            //Partner
            builder.HasOne<Partner>(p => p.DestinyPartner).WithMany(cd => cd.DestinyCollectDelivers).HasForeignKey(fk => fk.DestinyPartnerId).IsRequired(false);
            builder.HasOne<Partner>(p => p.SourcePartner).WithMany(cd => cd.SourceCollectDelivers).HasForeignKey(fk => fk.SourcePartnerId).IsRequired(false);
            //PartnerCompany
            builder.HasOne<Company>(p => p.DestinyCompany).WithMany(cd => cd.DestinyCollectsDelivers).HasForeignKey(fk => fk.DestinyCompanyId).IsRequired(false);
            builder.HasOne<Company>(p => p.SourceCompany).WithMany(cd => cd.SourceCollectsDelivers).HasForeignKey(fk => fk.SourceCompanyId).IsRequired(false);
            //Partner Transporter
            builder.HasOne<Partner>(p => p.Transporter).WithMany(cd => cd.TransporterCollectDelivers).HasForeignKey(fk => fk.TransporterId).IsRequired(false);
        }
    }
    #endregion


}
using Domain.Entities;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.StkProduct;
using Domain.Entities.ServicesBench;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Companies;
using Domain.Entities.Finances;
using Domain.Entities.Fill.StkProduct;

namespace Repository.Data.RelationshipEntities
{

    #region Company
    public class CompanyFluentApi : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasMany<CollectDeliver>(x => x.CollectsDelivers).WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId).IsRequired(false);

            builder.HasMany<Customer>(x => x.Customers).WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId).IsRequired(true);

            builder.HasMany<ElectronicRepair>(x => x.ElectronicsRepairs).WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId).IsRequired(true);

            builder.HasMany<Partner>(x => x.Partners).WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId).IsRequired(true);

            builder.HasMany<BudgetService>(x => x.ServicesExecuted).WithOne(x => x.Company)
                 .HasForeignKey(x => x.CompanyId);

            builder.HasMany<MyUser>(x => x.MyUsers).WithOne(x => x.Company)
            .HasForeignKey(x => x.CompanyId).IsRequired(true);

            builder.HasMany<MonthFixedExpenses>(x => x.MonthFixedExpenses).WithOne(x => x.Company)
             .HasForeignKey(fk => fk.CompanyId);
            
            builder.HasMany<MonthFixedExpensesFillers>(x => x.MonthFixedExpensesFillers).WithOne(x => x.Company)
             .HasForeignKey(fk => fk.CompanyId);

            builder.HasMany<MonthFixedExpensesTracking>(x => x.MonthFixedExpensesTrackings).WithOne(x => x.Company)
             .HasForeignKey(fk => fk.CompanyId);

            builder.HasMany<BankAccount>(x => x.BankAccounts).WithOne(x => x.Company)
            .HasForeignKey(fk => fk.CompanyId); 

            builder.HasMany<Item>(x => x.Item_Fillers).WithOne(x => x.Company)
            .HasForeignKey(fk => fk.CompanyId); 

            builder.HasMany<TableProvidedServicePrice>(x => x.TableProvidedServicesPrices).WithOne(x => x.Company)
            .HasForeignKey(fk => fk.CompanyId); 

        }
    }

    #endregion


}
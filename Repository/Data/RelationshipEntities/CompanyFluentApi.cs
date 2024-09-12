using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.ServicesBench;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Companies;
using Domain.Entities.Fill.StkProduct;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;

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

            builder.HasMany<CategoryExpense>(x => x.CategoriesExpenses).WithOne(x => x.Company)
             .HasForeignKey(fk => fk.CompanyId);

            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses).WithOne(x => x.Company)
             .HasForeignKey(fk => fk.CompanyId);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses).WithOne(x => x.Company)
             .HasForeignKey(fk => fk.CompanyId);

            builder.HasMany<FinancingAndLoanExpense>(x => x.FinancingsAndLoansExpenses).WithOne(x => x.Company)
             .HasForeignKey(fk => fk.CompanyId);

            builder.HasMany<VariableExpense>(x => x.VariablesExpenses).WithOne(x => x.Company)
          .HasForeignKey(fk => fk.CompanyId);

            builder.HasMany<CreditCardExpense>(x => x.CreditCardExpenses)
                    .WithOne(x => x.Company)
                    .HasForeignKey(fk => fk.UserId);

            builder.HasMany<CreditCardExpenseInvoice>(x => x.CreditCardExpensesInvoices)
                    .WithOne(x => x.Company)
                    .HasForeignKey(fk => fk.UserId);

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
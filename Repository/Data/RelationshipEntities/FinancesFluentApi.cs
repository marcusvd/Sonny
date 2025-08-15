using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.PixExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Finances
    public class BankAccountFluentApi : IEntityTypeConfiguration<BankAccount>
    {
        public void Configure(EntityTypeBuilder<BankAccount> builder)
        {
            builder.HasMany<Card>(x => x.Cards)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<Pix>(x => x.Pixes)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId);

            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<FinancingAndLoanExpenseInstallment>(x => x.FinancingsAndLoansExpensesInstallments)
            .WithOne(x => x.BankAccount)
            .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<CashWithdrawnExpense>(x => x.CashWithdrawnExpenses)
               .WithOne(x => x.BankAccount)
               .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

            builder.HasMany<CreditCardExpenseInvoice>(x => x.PaidCreditCardExpensesInvoices)
               .WithOne(x => x.PaidFromBankAccount)
               .HasForeignKey(fk => fk.PaidFromBankAccountId).IsRequired(false);

            builder.HasMany<CashWithdrawnExpense>(x => x.CashWithdrawnExpenses)
               .WithOne(x => x.BankAccount)
               .HasForeignKey(fk => fk.BankAccountId).IsRequired(false);

        }
    }
    public class CategoryExpensesFluentApi : IEntityTypeConfiguration<CategoryExpense>
    {
        public void Configure(EntityTypeBuilder<CategoryExpense> builder)
        {

            // builder.Property(x => x.Name).IsRequired(true);
            // builder.HasIndex(x => x.Name).IsUnique(true);

            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);

            builder.HasMany<FinancingAndLoanExpense>(x => x.FinancingsAndLoansExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);

            builder.HasMany<CashWithdrawnExpense>(x => x.CashWithdrawnExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);

            builder.HasMany<SubcategoryExpense>(x => x.SubcategoriesExpenses).WithOne(x => x.CategoryExpense)
            .HasForeignKey(fk => fk.CategoryExpenseId);
        }
    }
    public class SubcategoryExpensesFluentApi : IEntityTypeConfiguration<SubcategoryExpense>
    {
        public void Configure(EntityTypeBuilder<SubcategoryExpense> builder)
        {

            // builder.Property(x => x.Name).IsRequired(true);
            // builder.HasIndex(x => x.Name).IsUnique(true);

            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses).WithOne(x => x.SubcategoryExpense)
            .HasForeignKey(fk => fk.SubcategoryExpenseId);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses).WithOne(x => x.SubcategoryExpense)
                .HasForeignKey(fk => fk.SubcategoryExpenseId);

            builder.HasMany<FinancingAndLoanExpense>(x => x.FinancingsAndLoansExpenses).WithOne(x => x.SubcategoryExpense)
                .HasForeignKey(fk => fk.SubcategoryExpenseId);

            builder.HasMany<CashWithdrawnExpense>(x => x.CashWithdrawnExpenses).WithOne(x => x.SubcategoryExpense)
                  .HasForeignKey(fk => fk.SubcategoryExpenseId);

            builder.Ignore(x => x.Company);
            builder.Ignore(x => x.User);

        }
    }
    public class PixFluentApi : IEntityTypeConfiguration<Pix>
    {
        public void Configure(EntityTypeBuilder<Pix> builder)
        {
            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);

            builder.HasMany<FinancingAndLoanExpenseInstallment>(x => x.FinancingsAndLoansExpensesInstallments)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses)
            .WithOne(x => x.Pix)
            .HasForeignKey(fk => fk.PixId).IsRequired(false);

            // builder.HasMany<CashWithdrawnExpense>(x => x.CashWithdrawnExpenses)
            // .WithOne(x => x.Pix)
            // .HasForeignKey(fk => fk.PixId).IsRequired(false);
        }
    }
    public class CardFluentApi : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder.HasMany<MonthlyFixedExpense>(x => x.MonthlyFixedExpenses)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);

            builder.HasMany<YearlyFixedExpense>(x => x.YearlyFixedExpenses)
            .WithOne(x => x.Card)
            .HasForeignKey(fk => fk.CardId).IsRequired(false);

            builder.HasMany<FinancingAndLoanExpenseInstallment>(x => x.FinancingsAndLoansExpensesInstallments)
          .WithOne(x => x.Card)
          .HasForeignKey(fk => fk.CardId).IsRequired(false);

            // builder.HasMany<CashWithdrawnExpense>(x => x.CashWithdrawnExpenses)
            // .WithOne(x => x.Card)
            // .HasForeignKey(fk => fk.CardId).IsRequired(false);

            builder.HasMany<CreditCardExpenseInvoice>(x => x.CreditCardExpensesInvoices)
             .WithOne(x => x.Card)
             .HasForeignKey(fk => fk.CardId).IsRequired(false);
        }
    }
    public class PixExpenseFluentApi : IEntityTypeConfiguration<PixExpense>
    {
        public void Configure(EntityTypeBuilder<PixExpense> builder)
        {
            builder.Property(x => x.MonthlyFixedExpenseId).IsRequired(false);
            builder.Property(x => x.YearlyFixedExpenseId).IsRequired(false);
            builder.Property(x => x.CashWithdrawnExpenseId).IsRequired(false);
            builder.Property(x => x.FinancingAndLoanExpenseId).IsRequired(false);
        }
    }
    public class VariableExpenseFluentApi : IEntityTypeConfiguration<CashWithdrawnExpense>
    {
        public void Configure(EntityTypeBuilder<CashWithdrawnExpense> builder)

        {
            builder.HasMany<CreditCardExpense>(x => x.PaymentsByCreditCards)
           .WithOne(x => x.CashWithdrawnExpense)
           .HasForeignKey(fk => fk.CashWithdrawnExpenseId).IsRequired(false);

            builder.HasMany<PixExpense>(x => x.PaymentsByPixExpenses)
           .WithOne(x => x.CashWithdrawnExpense)
           .HasForeignKey(fk => fk.CashWithdrawnExpenseId).IsRequired(false);

        }
    }
    public class FinancingAndLoanExpenseFluentApi : IEntityTypeConfiguration<FinancingAndLoanExpense>
    {
        public void Configure(EntityTypeBuilder<FinancingAndLoanExpense> builder)
        {
            builder.HasMany<FinancingAndLoanExpenseInstallment>(x => x.FinancingsAndLoansExpensesInstallments)
            .WithOne(x => x.FinancingAndLoanExpense)
            .HasForeignKey(fk => fk.FinancingAndLoanExpenseId).IsRequired(false);

            builder.HasMany<CreditCardExpense>(x => x.PaymentsByCreditCards)
            .WithOne(x => x.FinancingAndLoanExpense)
            .HasForeignKey(fk => fk.FinancingAndLoanExpenseId).IsRequired(false);

            builder.HasMany<PixExpense>(x => x.PaymentsByPixExpenses)
            .WithOne(x => x.FinancingAndLoanExpense)
            .HasForeignKey(fk => fk.FinancingAndLoanExpenseId).IsRequired(false);

        }
    }
    public class MonthlyFixedExpenseFluentApi : IEntityTypeConfiguration<MonthlyFixedExpense>
    {
        public void Configure(EntityTypeBuilder<MonthlyFixedExpense> builder)
        {

            builder.HasMany<CreditCardExpense>(x => x.PaymentsByCreditCards)
            .WithOne(x => x.MonthlyFixedExpense)
            .HasForeignKey(fk => fk.MonthlyFixedExpenseId).IsRequired(false);

            builder.HasMany<PixExpense>(x => x.PaymentsByPixExpenses)
            .WithOne(x => x.MonthlyFixedExpense)
            .HasForeignKey(fk => fk.MonthlyFixedExpenseId).IsRequired(false);

        }
    }
    public class YearlyFixedExpenseFluentApi : IEntityTypeConfiguration<YearlyFixedExpense>
    {
        public void Configure(EntityTypeBuilder<YearlyFixedExpense> builder)
        {

            builder.HasMany<CreditCardExpense>(x => x.PaymentsByCreditCards)
            .WithOne(x => x.YearlyFixedExpense)
            .HasForeignKey(fk => fk.YearlyFixedExpenseId).IsRequired(false);

            builder.HasMany<PixExpense>(x => x.PaymentsByPixExpenses)
            .WithOne(x => x.YearlyFixedExpense)
            .HasForeignKey(fk => fk.YearlyFixedExpenseId).IsRequired(false);

        }
    }
    public class CreditCardExpenseFluentApi : IEntityTypeConfiguration<CreditCardExpense>
    {
        public void Configure(EntityTypeBuilder<CreditCardExpense> builder)
        {
            builder.Property(x => x.MonthlyFixedExpenseId).IsRequired(false);
            builder.Property(x => x.YearlyFixedExpenseId).IsRequired(false);
            builder.Property(x => x.CashWithdrawnExpenseId).IsRequired(false);
            builder.Property(x => x.FinancingAndLoanExpenseId).IsRequired(false);
        }
    }
    public class CreditCardExpenseInvoiceFluentApi : IEntityTypeConfiguration<CreditCardExpenseInvoice>
    {
        public void Configure(EntityTypeBuilder<CreditCardExpenseInvoice> builder)
        {
            builder.HasMany(x => x.CreditCardExpenses).WithOne(x => x.CreditCardExpenseInvoice).HasForeignKey(x => x.CreditCardExpenseInvoiceId);
        }
    }



    #endregion
}
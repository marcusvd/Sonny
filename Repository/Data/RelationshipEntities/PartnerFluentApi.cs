using Domain.Entities.Main;
using Domain.Entities.Main.Partners;
using Domain.Entities.Outsourced;
using Domain.Entities.StockProduct;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
    #region Partner
    public class PartnerFluentApi : IEntityTypeConfiguration<Partner>
    {
        public void Configure(EntityTypeBuilder<Partner> builder)
        {
            builder.HasMany<BillingFrom>(x => x.BillingFromCollectsDelivers).WithOne(x => x.Partner)
            .HasForeignKey(x => x.PartnerId);

            builder.HasMany<Destiny>(x => x.CollectDeliverDestinies).WithOne(x => x.Partner)
                       .HasForeignKey(fk => fk.PartnerId).IsRequired(false);

            builder.HasMany<Product>(x => x.Products).WithOne(x => x.Supplier)
                       .HasForeignKey(fk => fk.SupplierId).IsRequired(false);
        }
    }

    #endregion
    #region PaymentData
    public class PartnerPaymentDataFluentApi : IEntityTypeConfiguration<PaymentData>
    {
        public void Configure(EntityTypeBuilder<PaymentData> builder)
        {
            builder.Ignore(x => x.User);
            builder.Ignore(x => x.UserId);

            builder.HasMany<PartnerPaymentBankAccount>(x => x.BanksAccounts).WithOne(x => x.PaymentData)
            .HasForeignKey(x => x.PaymentDataId).IsRequired(false);

            builder.HasMany<PartnerPaymentPix>(x => x.Pixes).WithOne(x => x.PaymentData)
            .HasForeignKey(fk => fk.PaymentDataId).IsRequired(false);
        }
    }

    #endregion

    #region PartnerPaymentBankAccount
    public class PartnerPaymentBankAccountFluentApi : IEntityTypeConfiguration<PartnerPaymentBankAccount>
    {
        public void Configure(EntityTypeBuilder<PartnerPaymentBankAccount> builder)
        {
            builder.Ignore(x => x.User);
            builder.Ignore(x => x.UserId);
        }
    }
    #endregion
    #region PartnerPaymentPix
    public class PartnerPaymentPixFluentApi : IEntityTypeConfiguration<PartnerPaymentPix>
    {
        public void Configure(EntityTypeBuilder<PartnerPaymentPix> builder)
        {
            builder.Ignore(x => x.User);
            builder.Ignore(x => x.UserId);
        }
    }
    #endregion



}
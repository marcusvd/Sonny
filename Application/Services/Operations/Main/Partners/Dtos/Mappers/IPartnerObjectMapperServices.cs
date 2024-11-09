using System.Collections.Generic;
using Domain.Entities.Main;
using Domain.Entities.Main.Partners;


namespace Application.Services.Operations.Main.Partners.Dtos.Mappers
{
    public interface IPartnerObjectMapperServices
    {
        List<PartnerDto> PartnerListMake(List<Partner> list);
        List<Partner> PartnerListMake(List<PartnerDto> list);
        PartnerDto PartnerMapper(Partner entity);
        Partner PartnerMapper(PartnerDto entity);
        Partner PartnerUpdateMapper(PartnerDto dto, Partner db);

        List<PartnerPaymentBankAccountDto> PartnerPaymentBankAccountListMake(List<PartnerPaymentBankAccount> list);
        List<PartnerPaymentBankAccount> PartnerPaymentBankAccountListMake(List<PartnerPaymentBankAccountDto> list);
        PartnerPaymentBankAccountDto PartnerPaymentBankAccountMapper(PartnerPaymentBankAccount entity);
        PartnerPaymentBankAccount PartnerPaymentBankAccountMapper(PartnerPaymentBankAccountDto entity);
        PartnerPaymentBankAccount PartnerPaymentBankAccountUpdateMapper(PartnerPaymentBankAccountDto dto, PartnerPaymentBankAccount db);

        List<PartnerPaymentPixDto> PartnerPaymentPixListMake(List<PartnerPaymentPix> list);
        List<PartnerPaymentPix> PartnerPaymentPixListMake(List<PartnerPaymentPixDto> list);
        PartnerPaymentPixDto PartnerPaymentPixMapper(PartnerPaymentPix entity);
        PartnerPaymentPix PartnerPaymentPixMapper(PartnerPaymentPixDto entity);
        PartnerPaymentPix PartnerPaymentPixUpdateMapper(PartnerPaymentPixDto dto, PartnerPaymentPix db);

        List<PaymentDataDto> PaymentDataListMake(List<PaymentData> list);
        List<PaymentData> PaymentDataListMake(List<PaymentDataDto> list);
        PaymentDataDto PaymentDataMapper(PaymentData entity);
        PaymentData PaymentDataMapper(PaymentDataDto entity);
        PaymentData PaymentDataUpdateMapper(PaymentDataDto dto, PaymentData db);
    }
}
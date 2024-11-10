using System.Collections.Generic;


using Application.Services.Operations.Main.Partners.Enums;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Main.Partners;
using Domain.Entities.Main.Partners.Enums;


namespace Application.Services.Operations.Main.Partners.Dtos.Mappers
{
    public partial class PartnerObjectMapperServices : CommonObjectMapper, IPartnerObjectMapperServices
    {
        public List<PartnerPaymentBankAccountDto> PartnerPaymentBankAccountListMake(List<PartnerPaymentBankAccount> list)
        {
            if (list == null) return null;

            var toReturn = new List<PartnerPaymentBankAccountDto>();

            list.ForEach(x =>
            {
                toReturn.Add(PartnerPaymentBankAccountMapper(x));
            });

            return toReturn;
        }
        public List<PartnerPaymentBankAccount> PartnerPaymentBankAccountListMake(List<PartnerPaymentBankAccountDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<PartnerPaymentBankAccount>();

            list.ForEach(x =>
            {
                toReturn.Add(PartnerPaymentBankAccountMapper(x));
            });


            return toReturn;
        }
        public PartnerPaymentBankAccountDto PartnerPaymentBankAccountMapper(PartnerPaymentBankAccount entity)
        {
            if (entity == null) return null;

            var obj = new PartnerPaymentBankAccountDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,


                Holder = entity.Holder,
                Institution = entity.Institution,
                Account = entity.Account,
                Agency = entity.Agency,
                Type = (PaymentDataTypeAccountEnumDto)entity.Type,
                PaymentDataId = entity.PaymentDataId,
                PaymentData = PaymentDataMapper(entity.PaymentData)
            };

            return obj;
        }
        public PartnerPaymentBankAccount PartnerPaymentBankAccountMapper(PartnerPaymentBankAccountDto entity)
        {
            if (entity == null) return null;

            var obj = new PartnerPaymentBankAccount()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,


                Holder = entity.Holder,
                Institution = entity.Institution,
                Account = entity.Account,
                Agency = entity.Agency,
                Type = (PaymentDataTypeAccountEnum)entity.Type,
                PaymentDataId = entity.PaymentDataId,
                PaymentData = PaymentDataMapper(entity.PaymentData)
            };

            return obj;
        }
        public PartnerPaymentBankAccount PartnerPaymentBankAccountUpdateMapper(PartnerPaymentBankAccountDto dto, PartnerPaymentBankAccount db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.CompanyId = dto.CompanyId;


            db.Holder = dto.Holder;
            db.Institution = dto.Institution;
            db.Account = dto.Account;
            db.Agency = dto.Agency;
            db.Type = (PaymentDataTypeAccountEnum)dto.Type;
            db.PaymentDataId = dto.PaymentDataId;
            return db;
        }

    }
}
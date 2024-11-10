using System.Collections.Generic;


using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Main.Partners;


namespace Application.Services.Operations.Main.Partners.Dtos.Mappers
{
    public partial class PartnerObjectMapperServices : CommonObjectMapper, IPartnerObjectMapperServices
    {
        public List<PartnerPaymentPixDto> PartnerPaymentPixListMake(List<PartnerPaymentPix> list)
        {
            if (list == null) return null;

            var toReturn = new List<PartnerPaymentPixDto>();

            list.ForEach(x =>
            {
                toReturn.Add(PartnerPaymentPixMapper(x));
            });

            return toReturn;
        }
        public List<PartnerPaymentPix> PartnerPaymentPixListMake(List<PartnerPaymentPixDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<PartnerPaymentPix>();

            list.ForEach(x =>
            {
                toReturn.Add(PartnerPaymentPixMapper(x));
            });


            return toReturn;
        }
        public PartnerPaymentPixDto PartnerPaymentPixMapper(PartnerPaymentPix entity)
        {
            if (entity == null) return null;

            var obj = new PartnerPaymentPixDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                Key = entity.Key,
                Value = entity.Value,
                Holder = entity.Holder,
                PaymentDataId = entity.PaymentDataId,
                PaymentData = PaymentDataMapper(entity.PaymentData)
            };

            return obj;
        }
        public PartnerPaymentPix PartnerPaymentPixMapper(PartnerPaymentPixDto entity)
        {
            if (entity == null) return null;

            var obj = new PartnerPaymentPix()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,


                Key = entity.Key,
                Value = entity.Value,
                Holder = entity.Holder,
                PaymentDataId = entity.PaymentDataId,
                PaymentData = PaymentDataMapper(entity.PaymentData)
            };

            return obj;
        }
        public PartnerPaymentPix PartnerPaymentPixUpdateMapper(PartnerPaymentPixDto dto, PartnerPaymentPix db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.CompanyId = dto.CompanyId;


            db.Key = dto.Key;
            db.Value = dto.Value;
            db.Holder = dto.Holder;
            db.PaymentDataId = dto.PaymentDataId;

            return db;
        }

    }
}
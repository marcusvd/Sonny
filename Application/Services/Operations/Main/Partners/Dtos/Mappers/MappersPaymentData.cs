using System.Collections.Generic;


using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Main;



namespace Application.Services.Operations.Main.Partners.Dtos.Mappers
{
    public partial class PartnerObjectMapperServices : CommonObjectMapper, IPartnerObjectMapperServices
    {
        public List<PaymentDataDto> PaymentDataListMake(List<PaymentData> list)
        {
            if (list == null) return null;

            var toReturn = new List<PaymentDataDto>();

            list.ForEach(x =>
            {
                toReturn.Add(PaymentDataMapper(x));
            });

            return toReturn;
        }
        public List<PaymentData> PaymentDataListMake(List<PaymentDataDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<PaymentData>();

            list.ForEach(x =>
            {
                toReturn.Add(PaymentDataMapper(x));
            });


            return toReturn;
        }
        public PaymentDataDto PaymentDataMapper(PaymentData entity)
        {
            if (entity == null) return null;

            var obj = new PaymentDataDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,


                Money = entity.Money,
                Others = entity.Others,
                Pixes = new(),
                BanksAccounts = new(),
            };

            obj.Pixes = PartnerPaymentPixListMake(entity.Pixes);
            obj.BanksAccounts = PartnerPaymentBankAccountListMake(entity.BanksAccounts);


            return obj;
        }
        public PaymentData PaymentDataMapper(PaymentDataDto entity)
        {
            if (entity == null) return null;

            var obj = new PaymentData()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,


                Money = entity.Money,
                Others = entity.Others,
                Pixes = new(),
                BanksAccounts = new(),
            };
            
            obj.Pixes = PartnerPaymentPixListMake(entity.Pixes);
            obj.BanksAccounts = PartnerPaymentBankAccountListMake(entity.BanksAccounts);

            return obj;
        }
        public PaymentData PaymentDataUpdateMapper(PaymentDataDto dto, PaymentData db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.CompanyId = dto.CompanyId;


            db.Money = dto.Money;
            db.Others = dto.Others;

            return db;
        }

    }
}
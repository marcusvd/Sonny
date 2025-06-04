using System.Collections.Generic;


using Application.Services.Operations.Main.Inheritances.Enums;
using Application.Services.Operations.Main.Partners.Enums;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Main;
using Domain.Entities.Main.Inheritances.Enums;
using Domain.Entities.Main.Partners.Enums;


namespace Application.Services.Operations.Main.Partners.Dtos.Mappers
{
    public partial class PartnerObjectMapperServices : CommonObjectMapper, IPartnerObjectMapperServices
    {
        public List<PartnerDto> PartnerListMake(List<Partner> list)
        {
            if (list == null) return null;

            var toReturn = new List<PartnerDto>();

            list.ForEach(x =>
            {
                toReturn.Add(PartnerMapper(x));
            });

            return toReturn;
        }
        public List<Partner> PartnerListMake(List<PartnerDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Partner>();

            list.ForEach(x =>
            {
                toReturn.Add(PartnerMapper(x));
            });


            return toReturn;
        }
        public PartnerDto PartnerMapper(Partner entity)
        {
            if (entity == null) return null;

            var obj = new PartnerDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Name = entity.Name,
                Responsible = entity.Responsible,
                CNPJ = entity.CNPJ,
                EntityType = (EntityTypeEnumDto)entity.EntityType,
                PartnerBusiness = (PartnerBusinessEnumDto)entity.PartnerBusiness,
                Description = entity.Description,
                BusinessLine = entity.BusinessLine,
                PhysicallyMovingCosts = PhysicallyMovingCostsMapper(entity.PhysicallyMovingCosts),
                PaymentsData = PaymentDataMapper(entity.PaymentsData),
            };

            return obj;
        }
        public Partner PartnerMapper(PartnerDto entity)
        {
            if (entity == null) return null;

            var obj = new Partner()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Name = entity.Name,
                Responsible = entity.Responsible,
                CNPJ = entity.CNPJ,
                EntityType = (EntityTypeEnum)entity.EntityType,
                PartnerBusiness = (PartnerBusinessEnum)entity.PartnerBusiness,
                PhysicallyMovingCosts = PhysicallyMovingCostsMapper(entity.PhysicallyMovingCosts),
                Description = entity.Description,
                BusinessLine = entity.BusinessLine,

                PaymentsData = PaymentDataMapper(entity.PaymentsData),
            };

            return obj;
        }
        public Partner PartnerUpdateMapper(PartnerDto dto, Partner db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.UserId = dto.UserId;
            db.CompanyId = dto.CompanyId;


            db.Name = dto.Name;
            db.Responsible = dto.Responsible;
            db.CNPJ = dto.CNPJ;
            db.EntityType = (EntityTypeEnum)dto.EntityType;
            db.Description = dto.Description;
            db.BusinessLine = dto.BusinessLine;
            return db;
        }

    }
}
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Domain.Entities.Finances.Enums;
using Application.Services.Shared.Mapper;
using Application.Services.Operations.Outsourced.Dtos;
using Domain.Entities.Outsourced;


namespace Application.Services.Operations.Outsourced.Dtos.Mappers
{
    public partial class OutsourcedObjectMapperServices : CommonObjectMapper, IOutsourcedObjectMapperServices
    {
        public List<BillingFromDto> BillingFromListMake(List<BillingFrom> list)
        {
            if (list == null) return null;

            var toReturn = new List<BillingFromDto>();

            list.ForEach(x =>
            {
                toReturn.Add(BillingFromMapper(x));
            });

            return toReturn;
        }
        public List<BillingFrom> BillingFromListMake(List<BillingFromDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<BillingFrom>();

            list.ForEach(x =>
            {
                toReturn.Add(BillingFromMapper(x));
            });


            return toReturn;
        }
        public BillingFromDto BillingFromMapper(BillingFrom entity)
        {


            if (entity == null) return null;

            var obj = new BillingFromDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                PartnerId = entity.PartnerId,
                Partner = _IPartnerObjectMapperServices.PartnerMapper(entity.Partner),
                CustomerId = entity.CustomerId,
                Customer = _ICustomerObjectMapperServices.CustomerMapper(entity.Customer),
                Base = entity.Base,
            };

            return obj;
        }
        public BillingFrom BillingFromMapper(BillingFromDto entity)
        {
            if (entity == null) return null;

            var obj = new BillingFrom()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                PartnerId = entity.PartnerId,
                Partner = _IPartnerObjectMapperServices.PartnerMapper(entity.Partner),
                CustomerId = entity.CustomerId,
                Customer = _ICustomerObjectMapperServices.CustomerMapper(entity.Customer),
                Base = entity.Base,
            };

            return obj;
        }
        public BillingFrom BillingFromUpdateMapper(BillingFromDto dto, BillingFrom db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.CompanyId = dto.CompanyId;
            return db;
        }

    }
}
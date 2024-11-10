using System.Collections.Generic;

using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.Outsourced;


namespace Application.Services.Operations.Outsourced.Dtos.Mappers
{
    public partial class OutsourcedObjectMapperServices : CommonObjectMapper, IOutsourcedObjectMapperServices
    {
        public List<DestinyDto> DestinyListMake(List<Destiny> list)
        {
            if (list == null) return null;

            var toReturn = new List<DestinyDto>();

            list.ForEach(x =>
            {
                toReturn.Add(DestinyMapper(x));
            });

            return toReturn;
        }
        public List<Destiny> DestinyListMake(List<DestinyDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Destiny>();

            list.ForEach(x =>
            {
                toReturn.Add(DestinyMapper(x));
            });


            return toReturn;
        }
        public DestinyDto DestinyMapper(Destiny entity)
        {
            if (entity == null) return null;

            var obj = new DestinyDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                CustomerId = entity.CustomerId,
                Customer = _ICustomerObjectMapperServices.CustomerMapper(entity.Customer),
                PartnerId = entity.PartnerId,
                Partner = _IPartnerObjectMapperServices.PartnerMapper(entity.Partner),
                NoRegisterName = entity.NoRegisterName,
                NoRegisterAddress = entity.NoRegisterAddress
            };

            return obj;
        }
        public Destiny DestinyMapper(DestinyDto entity)
        {
            if (entity == null) return null;

            var obj = new Destiny()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                CustomerId = entity.CustomerId,
                Customer = _ICustomerObjectMapperServices.CustomerMapper(entity.Customer),
                PartnerId = entity.PartnerId,
                Partner = _IPartnerObjectMapperServices.PartnerMapper(entity.Partner),
                NoRegisterName = entity.NoRegisterName,
                NoRegisterAddress = entity.NoRegisterAddress,
            };

            return obj;
        }
        public Destiny DestinyUpdateMapper(DestinyDto dto, Destiny db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.UserId = dto.UserId;
            db.CompanyId = dto.CompanyId;
            return db;
        }
    }
}
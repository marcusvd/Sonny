using System.Collections.Generic;
using Application.Services.Operations.Main.Inheritances.Enums;
using Application.Services.Shared.Mapper;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Inheritances.Enums;


namespace Application.Services.Operations.Main.Customers.Dtos.Mappers
{
    public partial class CustomerObjectMapperServices : CommonObjectMapper, ICustomerObjectMapperServices
    {
        public List<AdditionalCostsDto> AdditionalCostsListMake(List<AdditionalCosts> list)
        {
            if (list == null) return null;

            var toReturn = new List<AdditionalCostsDto>();

            list.ForEach(x =>
            {
                toReturn.Add(AdditionalCostsMapper(x));
            });

            return toReturn;
        }
        public List<AdditionalCosts> AdditionalCostsListMake(List<AdditionalCostsDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<AdditionalCosts>();

            list.ForEach(x =>
            {
                toReturn.Add(AdditionalCostsMapper(x));
            });


            return toReturn;
        }
        public AdditionalCostsDto AdditionalCostsMapper(AdditionalCosts entity)
        {
            if (entity == null) return null;

            var obj = new AdditionalCostsDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                FixedPhysicallyMovingCosts = entity.FixedPhysicallyMovingCosts

            };




            return obj;
        }
        public AdditionalCosts AdditionalCostsMapper(AdditionalCostsDto entity)
        {
            if (entity == null) return null;

            var obj = new AdditionalCosts()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,

                FixedPhysicallyMovingCosts = entity.FixedPhysicallyMovingCosts

            };



            return obj;
        }
        public AdditionalCosts AdditionalCostsUpdateMapper(AdditionalCostsDto dto, AdditionalCosts db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.CompanyId = dto.CompanyId;
            db.FixedPhysicallyMovingCosts = dto.FixedPhysicallyMovingCosts;


            return db;
        }

    }
}
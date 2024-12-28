using System.Collections.Generic;
using System.Linq;
using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices : CommonObjectMapper, IStockProductObjectMapperServices
    {
        public List<SpecificitiesDto> SpecificitiesListMake(List<Specificities> list)
        {
            if (list == null) return null;

            var toReturn = new List<SpecificitiesDto>();

            list.ForEach(x =>
            {
                toReturn.Add(SpecificitiesMapper(x));
            });


            return toReturn;
        }
        public List<Specificities> SpecificitiesListMake(List<SpecificitiesDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Specificities>();

            list.ForEach(x =>
            {
                toReturn.Add(SpecificitiesMapper(x));
            });


            return toReturn;
        }
        public SpecificitiesDto SpecificitiesMapper(Specificities entity)
        {
            if (entity == null) return null;

            var obj = new SpecificitiesDto()
            {
                Id = entity.Id,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                Speed = entity.Speed,
                Capacity = entity.Capacity,
                ModelId = entity.ModelId,
            };

            return obj;
        }
        public Specificities SpecificitiesMapper(SpecificitiesDto entity)
        {
            if (entity == null) return null;

            var obj = new Specificities()
            {
                Id = entity.Id,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                Speed = entity.Speed,
                Capacity = entity.Capacity,
                ModelId = entity.ModelId,
            };

            return obj;
        }

    }
}
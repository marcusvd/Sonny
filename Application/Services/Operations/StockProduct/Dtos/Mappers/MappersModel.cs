using System.Collections.Generic;


using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices:CommonObjectMapper, IStockProductObjectMapperServices
    {
        public List<ModelDto> ModelListMake(List<Model> list)
        {
            if (list == null) return null;

            var toReturn = new List<ModelDto>();

            list.ForEach(x =>
            {
                toReturn.Add(ModelMapper(x));
            });


            return toReturn;
        }
        public List<Model> ModelListMake(List<ModelDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Model>();

            list.ForEach(x =>
            {
                toReturn.Add(ModelMapper(x));
            });


            return toReturn;
        }
        public ModelDto ModelMapper(Model entity)
        {
            if (entity == null) return null;

            var obj = new ModelDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                Description = entity.Description,
                ManufacturerId = entity.ManufacturerId,
            };

            return obj;
        }
        public Model ModelMapper(ModelDto entity)
        {
            if (entity == null) return null;

            var obj = new Model()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                Description = entity.Description,
                ManufacturerId = entity.ManufacturerId,
            };

            return obj;
        }

    }
}
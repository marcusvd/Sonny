using System.Collections.Generic;


using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices : CommonObjectMapper, IStockProductObjectMapperServices
    {
        public List<ManufacturerDto> ManufacturerListMake(List<Manufacturer> list)
        {
            if (list == null) return null;

            var toReturn = new List<ManufacturerDto>();

            list.ForEach(x =>
            {
                toReturn.Add(ManufacturerMapper(x));
            });


            return toReturn;
        }
        public List<Manufacturer> ManufacturerListMake(List<ManufacturerDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Manufacturer>();

            list.ForEach(x =>
            {
                toReturn.Add(ManufacturerMapper(x));
            });


            return toReturn;
        }
        public ManufacturerDto ManufacturerMapper(Manufacturer entity)
        {
            if (entity == null) return null;

            var obj = new ManufacturerDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                SegmentId = entity.SegmentId,
                Models = ModelListMake(entity.Models),
                Products = ProductListMake(entity.Products)
            };

            return obj;
        }
        public Manufacturer ManufacturerMapper(ManufacturerDto entity)
        {
            if (entity == null) return null;

            var obj = new Manufacturer()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                SegmentId = entity.SegmentId,
                Models = ModelListMake(entity.Models),
                Products = ProductListMake(entity.Products)
            };

            return obj;
        }

    }
}
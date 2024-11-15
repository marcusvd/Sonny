using System.Collections.Generic;


using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices:CommonObjectMapper, IStockProductObjectMapperServices
    {
        public List<ProductTypeDto> ProductTypeListMake(List<ProductType> list)
        {
            if (list == null) return null;

            var toReturn = new List<ProductTypeDto>();

            list.ForEach(x =>
            {
                toReturn.Add(ProductTypeMapper(x));
            });


            return toReturn;
        }
        public List<ProductType> ProductTypeListMake(List<ProductTypeDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<ProductType>();

            list.ForEach(x =>
            {
                toReturn.Add(ProductTypeMapper(x));
            });


            return toReturn;
        }
        public ProductTypeDto ProductTypeMapper(ProductType entity)
        {
            if (entity == null) return null;

            var obj = new ProductTypeDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                Segments = SegmentListMake(entity.Segments)
                
            };

            return obj;
        }
        public ProductType ProductTypeMapper(ProductTypeDto entity)
        {
            if (entity == null) return null;

            var obj = new ProductType()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                Segments = SegmentListMake(entity.Segments)
                
            };

            return obj;
        }

    }
}
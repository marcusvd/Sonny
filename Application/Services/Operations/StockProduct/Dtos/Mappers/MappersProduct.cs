using System.Collections.Generic;


using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices:CommonObjectMapper, IStockProductObjectMapperServices
    {
        public List<ProductDto> ProductListMake(List<Product> list)
        {
            if (list == null) return null;

            var toReturn = new List<ProductDto>();

            list.ForEach(x =>
            {
                toReturn.Add(ProductMapper(x));
            });


            return toReturn;
        }
        public List<Product> ProductListMake(List<ProductDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Product>();

            list.ForEach(x =>
            {
                toReturn.Add(ProductMapper(x));
            });


            return toReturn;
        }
        public ProductDto ProductMapper(Product entity)
        {
            if (entity == null) return null;

            var obj = new ProductDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                Segments = SegmentListMake(entity.Segments)
                
            };

            return obj;
        }
        public Product ProductMapper(ProductDto entity)
        {
            if (entity == null) return null;

            var obj = new Product()
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
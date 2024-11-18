using System.Collections.Generic;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct;


namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices : CommonObjectMapper, IStockProductObjectMapperServices
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
                Registered = entity.Registered,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                ManufacturerId = entity.ManufacturerId,
                Manufacturer = ManufacturerMapper(entity.Manufacturer),
                SegmentId = entity.SegmentId,
                Segment = SegmentMapper(entity.Segment),
                ModelId = entity.ModelId,
                Model = ModelMapper(entity.Model),
                Description = entity.Description,
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
                Registered = entity.Registered,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                ManufacturerId = entity.ManufacturerId,
                Manufacturer = ManufacturerMapper(entity.Manufacturer),
                SegmentId = entity.SegmentId,
                Segment = SegmentMapper(entity.Segment),
                ModelId = entity.ModelId,
                Model = ModelMapper(entity.Model),
                Description = entity.Description,
            };

            return obj;
        }

    }
}
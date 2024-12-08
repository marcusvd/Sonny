using System.Collections.Generic;
using System.Linq;
using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices : CommonObjectMapper, IStockProductObjectMapperServices
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
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                Name = entity.Name,
                Deleted = entity.Deleted,
                Segments = SegmentListMake(entity.Segments),
                Products = ProductListMake(entity.Products)

            };

            return obj;
        }
        public ProductType ProductTypeMapper(ProductTypeDto entity)
        {
            if (entity == null) return null;

            var obj = new ProductType()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                Name = entity.Name,
                Deleted = entity.Deleted,
                Segments = SegmentListMake(entity.Segments),
                Products = ProductListMake(entity.Products)
            };

            return obj;
        }


        public List<ProductType> ProductTypeUpdateListMake(List<ProductTypeDto> dto, List<ProductType> db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            var filtered = db.Where(db => dto.Any(dto => db.Id == dto.Id)).ToList();

            dto.ForEach(xDto =>
            {
                filtered.ForEach(yDb =>
                {
                    if (xDto.Id == yDb.Id)
                    {
                        xDto.Segments = SegmentListMake(yDb.Segments);
                    }
                });
            });

            return ProductTypeListMake(dto);
        }


    }
}
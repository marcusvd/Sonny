using System.Collections.Generic;
using System.Linq;
using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices:CommonObjectMapper, IStockProductObjectMapperServices
    {
        public List<SegmentDto> SegmentListMake(List<Segment> list)
        {
            if (list == null) return null;

            var toReturn = new List<SegmentDto>();

            list.ForEach(x =>
            {
                toReturn.Add(SegmentMapper(x));
            });


            return toReturn;
        }
        public List<Segment> SegmentListMake(List<SegmentDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Segment>();

            list.ForEach(x =>
            {
                toReturn.Add(SegmentMapper(x));
            });


            return toReturn;
        }
        public SegmentDto SegmentMapper(Segment entity)
        {
            if (entity == null) return null;

            var obj = new SegmentDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                ProductTypeId = entity.ProductTypeId,
                Manufacturers = ManufacturerListMake(entity.Manufacturers),
                Registered = entity.Registered,
                //Products = ProductListMake(entity.Products)
            };

            return obj;
        }
        public Segment SegmentMapper(SegmentDto entity)
        {
            if (entity == null) return null;

            var obj = new Segment()
            {
                Id = entity.Id,
                Name = entity.Name,
                Deleted = entity.Deleted,
                CompanyId = entity.CompanyId,
                ProductTypeId = entity.ProductTypeId,
                Manufacturers = ManufacturerListMake(entity.Manufacturers),
                Registered = entity.Registered,
                // Products = ProductListMake(entity.Products)
            };

            return obj;
        }

        public List<Segment> SegmentUpdateListMake(List<SegmentDto> dto, List<Segment> db)
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
                        xDto.Manufacturers = ManufacturerListMake(yDb.Manufacturers);
                    }
                });
            });

            return SegmentListMake(dto);
        }

    }
}
using System.Collections.Generic;
using Application.Services.Operations.StockProduct.ProductKind;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.Finances.Dtos
{
    public interface IStockProductObjectMapperServices
    {
        List<ProductTypeDto> ProductTypeListMake(List<ProductType> list);
        List<ProductType> ProductTypeListMake(List<ProductTypeDto> list);
        ProductTypeDto ProductTypeMapper(ProductType entity);
        ProductType ProductTypeMapper(ProductTypeDto entity);

        List<SegmentDto> SegmentListMake(List<Segment> list);
        List<Segment> SegmentListMake(List<SegmentDto> list);
        SegmentDto SegmentMapper(Segment entity);
        Segment SegmentMapper(SegmentDto entity);

        List<ManufacturerDto> ManufacturerListMake(List<Manufacturer> list);
        List<Manufacturer> ManufacturerListMake(List<ManufacturerDto> list);
        ManufacturerDto ManufacturerMapper(Manufacturer entity);
        Manufacturer ManufacturerMapper(ManufacturerDto entity);

        List<ModelDto> ModelListMake(List<Model> list);
        List<Model> ModelListMake(List<ModelDto> list);
        ModelDto ModelMapper(Model entity);
        Model ModelMapper(ModelDto entity);


    }
}
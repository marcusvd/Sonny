using System.Collections.Generic;
using Application.Services.Operations.StockProduct.ProductKind;
using Domain.Entities.StockProduct;
using Domain.Entities.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public interface IStockProductObjectMapperServices
    {
        List<ProductDto> ProductListMake(List<Product> list);
        List<Product> ProductListMake(List<ProductDto> list);
        ProductDto ProductMapper(Product entity);
        Product ProductMapper(ProductDto entity);

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

        List<StockDto> StockListMake(List<Stock> list);
        List<Stock> StockListMake(List<StockDto> list);
        StockDto StockMapper(Stock entity);
        Stock StockMapper(StockDto entity);

        List<ItemProductDto> ItemProductListMake(List<ItemProduct> list);
        List<ItemProduct> ItemProductListMake(List<ItemProductDto> list);
        ItemProductDto ItemProductMapper(ItemProduct entity);
        ItemProduct ItemProductMapper(ItemProductDto entity);

    }
}
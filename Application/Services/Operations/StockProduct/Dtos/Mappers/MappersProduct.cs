using System;
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
                CompanyId = entity.CompanyId,
                IsReservedByUserId = entity.IsReservedByUserId,
                ProductTypeId = entity.ProductTypeId,
                ProductType = ProductTypeMapper(entity.ProductType),
                SegmentId = entity.SegmentId,
                Segment = SegmentMapper(entity.Segment),
                ManufacturerId = entity.ManufacturerId,
                Manufacturer = ManufacturerMapper(entity.Manufacturer),
                ModelId = entity.ModelId,
                Model = ModelMapper(entity.Model),
                SpecificitiesId = entity.SpecificitiesId,
                Specificities = SpecificitiesMapper(entity.Specificities),
                IsReservedByUser = entity.IsReservedByUser != null ? MyUserMapper(entity.IsReservedByUser) : null ,
                IsReserved = entity.IsReserved,
                ReservedForCustomerId = entity.ReservedForCustomerId,
                ReservedForCustomer = _ICustomerObjectMapperServices.CustomerMapper(entity.ReservedForCustomer),
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                UserId = entity.UserId,
                PurchaseInvoiceNumber = entity.PurchaseInvoiceNumber,
                CostPrice = entity.CostPrice,
                SoldPrice = entity.SoldPrice,
                EntryDate = entity.EntryDate,
                SoldDate = entity.SoldDate,
                WarrantyEnd = entity.WarrantyEnd,
                WarrantyEndLocal = entity.WarrantyEndLocal,
                IsUsed = entity.IsUsed,
                IsTested = entity.IsTested,
                UsedHistoricalOrSupplier = entity.UsedHistoricalOrSupplier,
                SupplierId = entity.SupplierId ?? 0,
                Supplier = _IPartnerObjectMapperServices.PartnerMapper(entity.Supplier),
            };

            return obj;
        }
        public Product ProductMapper(ProductDto entity)
        {
            if (entity == null) return null;

            var obj = new Product()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                IsReservedByUserId = entity.IsReservedByUserId,
                ProductTypeId = entity.ProductTypeId,
                ProductType = ProductTypeMapper(entity.ProductType),
                SegmentId = entity.SegmentId,
                Segment = SegmentMapper(entity.Segment),
                ManufacturerId = entity.ManufacturerId,
                Manufacturer = ManufacturerMapper(entity.Manufacturer),
                ModelId = entity.ModelId,
                Model = ModelMapper(entity.Model),
                SpecificitiesId = entity.SpecificitiesId,
                Specificities = SpecificitiesMapper(entity.Specificities),
                IsReserved = entity.IsReserved,
                ReservedForCustomerId = entity.ReservedForCustomerId,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                PurchaseInvoiceNumber = entity.PurchaseInvoiceNumber,
                CostPrice = entity.CostPrice,
                SoldPrice = entity.SoldPrice,
                EntryDate = entity.EntryDate,
                SoldDate = entity.SoldDate,
                WarrantyEnd = entity.WarrantyEnd,
                WarrantyEndLocal = entity.WarrantyEndLocal,
                IsUsed = entity.IsUsed,
                IsTested = entity.IsTested,
                UsedHistoricalOrSupplier = entity.UsedHistoricalOrSupplier,
                SupplierId = entity.SupplierId,
                Supplier = _IPartnerObjectMapperServices.PartnerMapper(entity.Supplier),
            };

            return obj;
        }

    }
}
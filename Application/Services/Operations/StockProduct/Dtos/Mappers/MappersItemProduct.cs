using System.Collections.Generic;


using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct;


namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices : CommonObjectMapper, IStockProductObjectMapperServices
    {
        public List<ItemProductDto> ItemProductListMake(List<ItemProduct> list)
        {
            if (list == null) return null;

            var toReturn = new List<ItemProductDto>();

            list.ForEach(x =>
            {
                toReturn.Add(ItemProductMapper(x));
            });


            return toReturn;
        }
        public List<ItemProduct> ItemProductListMake(List<ItemProductDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<ItemProduct>();

            list.ForEach(x =>
            {
                toReturn.Add(ItemProductMapper(x));
            });


            return toReturn;
        }
        public ItemProductDto ItemProductMapper(ItemProduct entity)
        {
            if (entity == null) return null;

            var obj = new ItemProductDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                IsReservedByUserId = entity.IsReservedByUserId,
                // IsReservedByUser = MyUserMapper(entity.IsReservedByUser),
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
                StockId = entity.StockId,
                SupplierId = entity.SupplierId,
                Supplier = _IPartnerObjectMapperServices.PartnerMapper(entity.Supplier),
            };

            return obj;
        }
        public ItemProduct ItemProductMapper(ItemProductDto entity)
        {
            if (entity == null) return null;

            var obj = new ItemProduct()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                IsReservedByUserId = entity.IsReservedByUserId,
                // IsReservedByUser = MyUserMapper(entity.IsReservedByUser),
                IsReserved = entity.IsReserved,
                ReservedForCustomerId = entity.ReservedForCustomerId,
                // ReservedForCustomer = _ICustomerObjectMapperServices.CustomerMapper(entity.ReservedForCustomer),
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
                StockId = entity.StockId,
                SupplierId = entity.SupplierId,
                Supplier = _IPartnerObjectMapperServices.PartnerMapper(entity.Supplier),
            };

            return obj;
        }

    }
}
using System.Collections.Generic;


using Application.Services.Operations.StockProduct;
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
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                NfNumber = entity.NfNumber,
                CostPrice = entity.CostPrice,
                SoldPrice = entity.SoldPrice,
                EntryDate = entity.EntryDate,
                SoldDate = entity.SoldDate,
                WarrantyEnd = entity.WarrantyEnd,
                WarrantyEndLocal = entity.WarrantyEndLocal,
                IsUsed = entity.IsUsed,
                IsTested = entity.IsTested,
                UsedHistorical = entity.UsedHistorical,
                StockId = entity.StockId,
                SupplierId = entity.SupplierId,
                Supplier = entity.Supplier,
            };

            return obj;
        }
        public ItemProduct ItemProductMapper(ItemProductDto entity)
        {
            if (entity == null) return null;

            var obj = new ItemProduct()
            {
                 Id = entity.Id,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                NfNumber = entity.NfNumber,
                CostPrice = entity.CostPrice,
                SoldPrice = entity.SoldPrice,
                EntryDate = entity.EntryDate,
                SoldDate = entity.SoldDate,
                WarrantyEnd = entity.WarrantyEnd,
                WarrantyEndLocal = entity.WarrantyEndLocal,
                IsUsed = entity.IsUsed,
                IsTested = entity.IsTested,
                UsedHistorical = entity.UsedHistorical,
                StockId = entity.StockId,
                SupplierId = entity.SupplierId,
                Supplier = entity.Supplier,
            };

            return obj;
        }

    }
}
using System.Collections.Generic;
using Application.Services.Shared.Dtos.Mappers;
using Domain.Entities.StockProduct;


namespace Application.Services.Operations.StockProduct.Dtos.Mappers
{
    public partial class StockProductObjectMapperServices : CommonObjectMapper, IStockProductObjectMapperServices
    {
        public List<StockDto> StockListMake(List<Stock> list)
        {
            if (list == null) return null;

            var toReturn = new List<StockDto>();

            list.ForEach(x =>
            {
                toReturn.Add(StockMapper(x));
            });


            return toReturn;
        }
        public List<Stock> StockListMake(List<StockDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Stock>();

            list.ForEach(x =>
            {
                toReturn.Add(StockMapper(x));
            });


            return toReturn;
        }
        public StockDto StockMapper(Stock entity)
        {
            if (entity == null) return null;

            var obj = new StockDto()
            {
                Id = entity.Id,

                Deleted = entity.Deleted,
                Registered = entity.Registered,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                Product = ProductMapper(entity.Product),
                ItemsProducts = ItemProductListMake(entity.ItemsProducts)
            };

            return obj;
        }
        public Stock StockMapper(StockDto entity)
        {
            if (entity == null) return null;

            var obj = new Stock()
            {
                Id = entity.Id,

                Deleted = entity.Deleted,
                Registered = entity.Registered,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                Product = ProductMapper(entity.Product),
                ItemsProducts = ItemProductListMake(entity.ItemsProducts)

            };

            return obj;
        }

    }
}
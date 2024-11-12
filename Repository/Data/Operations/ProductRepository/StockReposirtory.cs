using System.Collections.Generic;
using Domain.Entities.StockProduct;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository
{
    public class StockReposirtory : Repository<Stock>, IStockReposirtory
    {
        private readonly SonnyDbContext _CONTEXT;
        public StockReposirtory(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        // public async void AddRangeAsync(List<Stock> entities)
        // {
        //     await _CONTEXT.PD_Stocks.AddRangeAsync(entities);
        // }
    
       

    }
}
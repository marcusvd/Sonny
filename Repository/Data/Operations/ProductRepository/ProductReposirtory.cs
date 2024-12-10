
using System.Collections.Generic;
using Domain.Entities.StockProduct;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository
{
    public class ProductReposirtory : Repository<Product>, IProductReposirtory
    {
        private readonly SonnyDbContext _CONTEXT;
        public ProductReposirtory(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRange(List<Product> entities)
        {
            await _CONTEXT.PD_Products.AddRangeAsync(entities);
        }
    
       

    }
}
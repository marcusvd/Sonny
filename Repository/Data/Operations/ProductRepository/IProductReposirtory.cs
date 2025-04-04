
using System.Collections.Generic;
using Domain.Entities.StockProduct;
using Repository.Data.Operations.Repository;


namespace Repository.Data.Operations.ProductRepository
{
    public interface IProductReposirtory : IRepository<Product>
    {
        void AddRange(List<Product> entities);
    }
}

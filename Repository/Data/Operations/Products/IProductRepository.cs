using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Products
{
    public interface IProductRepository : IRepository<Product>
    {
       // Task<int> GetQuantity(string equipament);
        Task<bool> save();
        Task<List<Product>> GetAllByStockIdAllIncluded(int id);
        Task<Product> GetByStockIdAllIncluded(int stockId, int productId);
        Task<Product> GetProductByIdByStockIdTrakingIncludedAsync(int stockId, int productId);
        Task<Product> GetProductByIdByStockIdQuantitiesIncludedAsync(int stockId, int productId);
    }
}
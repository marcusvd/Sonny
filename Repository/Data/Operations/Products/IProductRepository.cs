using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Product;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Products
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<PagedList<Product>> GetProductsPagedAsync(Params parameters);
         Task<Product> GetProductByIdByStockIdTrakingIncludedAsync(int stockId, int productId);//Update
         Task<List<Product>> GetAllByStockIdNameEquipamentIncluded(int id);
        // Task<List<Product>> GetAllByStockIdAllIncluded(int id);
        // Task<Product> GetByStockIdAllIncluded(int stockId, int productId);
        // Task<Product> GetProductByIdByStockIdQuantitiesIncludedAsync(int stockId, int productId);
    }
}
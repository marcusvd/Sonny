
using Repository.Data.Operations.Repository;
using Domain.Entities.Product;
using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination.Models;

namespace Repository.Data.Operations.Products
{
    public interface IEquipamentRepository : IRepository<EquipamentType>
    {
        void AddRangeAsync(List<EquipamentType> entities);
        Task<PagedList<EquipamentType>> GetEquipamentsPagedAsync(Params parameters);
    }
}


// namespace Repository.Data.Operations.Stocks
// {
//     public interface IProductRepository : IRepository<Product>
//     {
//         Task<int> GetQuantity(string equipament);
//     }
// }

using Repository.Data.Operations.Repository;
using Domain.Entities.StkProduct;
using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination.Models;

namespace Repository.Data.Operations.ProductRepository
{
    public interface IEquipamentRepository : IRepository<Equipament>
    {
        void AddRangeAsync(List<Equipament> entities);
       // Task<PagedList<Equipament>> GetEquipamentsPagedAsync(Params parameters);
    }
}


// namespace Repository.Data.Operations.Stocks
// {
//     public interface IProductRepository : IRepository<Product>
//     {
//         Task<int> GetQuantity(string equipament);
//     }
// }
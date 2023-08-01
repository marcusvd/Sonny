
using Repository.Data.Operations.Repository;
using Domain.Entities.Stocks;
using System.Threading.Tasks;

namespace Repository.Data.Operations.Stock
{
    public interface IEquipamentRepository : IRepository<EquipamentType>
    {
        Task<bool> save();
    }
}


// namespace Repository.Data.Operations.Stocks
// {
//     public interface IProductRepository : IRepository<Product>
//     {
//         Task<int> GetQuantity(string equipament);
//     }
// }
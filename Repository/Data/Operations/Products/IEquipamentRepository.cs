
using Repository.Data.Operations.Repository;
using Domain.Entities.Stocks;


namespace Repository.Data.Operations.Products
{
    public interface IEquipamentRepository : IRepository<EquipamentType>
    {

    }
}


// namespace Repository.Data.Operations.Stocks
// {
//     public interface IProductRepository : IRepository<Product>
//     {
//         Task<int> GetQuantity(string equipament);
//     }
// }
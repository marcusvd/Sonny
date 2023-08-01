using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Stock
{
    public interface IManufacturerRepository : IRepository<Manufacturer>
    {
        Task<bool> save();
    }
}
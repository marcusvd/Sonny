using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IInventoryRepository:IRepository<Inventory>
    {
        // Task<Inventory[]> GetAll(bool include = false);
        // Task<Inventory> GetByIdAsync(int id, bool include = false);
    }
}
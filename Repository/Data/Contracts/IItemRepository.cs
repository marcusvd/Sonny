using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IItemRepository: IRepository<Item>
    {
        // Task<Item[]> GetAll(bool include = false);
        // Task<Item> GetByIdAsync(int Id, bool include = false);

    }
}
using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IClientRepository : IRepository<ClientEntity>
    {
        // Task<ClientEntity[]> GetAllAsync(bool include);
        // Task<ClientEntity> GetByIdAsync(int Id, bool include);
    }
}
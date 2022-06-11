using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ISocialNetworkRepository : IRepository<SocialNetwork>
    {
        // Task<SocialNetwork> GetByIdAsync(int id, bool include);
        // Task<SocialNetwork[]> GetAllAsync();
    }
}
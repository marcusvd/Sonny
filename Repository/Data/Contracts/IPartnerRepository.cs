using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IPartnerRepository : IRepository<Partner>
    {
        // Task<Partner[]> GetAll(bool include = false);
        // Task<Partner> GetByIdAsync(int Id, bool include = false);

   
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Pagination;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IClientRepository : IRepository<ClientEntity>
    {
         Task<List<ClientEntity>> GetAllIncludedAsync();
        Task<ClientEntity> GetByIdIncludedAsync(int id, bool include = false);
        Task<PagedList<ClientEntity>> GetClientPagedAsync(PgParams parameters);
        
    }
}
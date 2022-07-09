using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Pagination;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface IInventoryRepository : IRepository<Inventory>
    {
        Task<List<Inventory>> GetAllIncludedEquipamentAsync();
        Task<PagedList<Inventory>> GetPagedAllIncluded(PgParams parameters);
        Task<List<Inventory>> GetAllIncludedPartnerAsync();
        Task<Inventory> GetAllIncludedByIdAsync(int id);
    }
}
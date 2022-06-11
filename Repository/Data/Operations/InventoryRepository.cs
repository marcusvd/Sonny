using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{

    public class InventoryRepository : Repository<Inventory>, IInventoryRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public InventoryRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async Task<Inventory[]> GetAll(bool include = false)
        {
            IQueryable<Inventory> query = _CONTEXT.Inventories.AsNoTracking();

            if (include)
            {
                query = query
                .Include(subCategory => subCategory.SubCategory);
            }
            return await query.ToArrayAsync();
        }

        public async Task<Inventory> GetByIdAsync(int id, bool include = false)
        {
            IQueryable<Inventory> inventory = _CONTEXT.Inventories.AsNoTracking();

            if (include)
            {
                inventory = inventory.Include(subCategory => subCategory.SubCategory);
            }

            return await inventory.FirstOrDefaultAsync(_id => _id.Id == id);

        }
    }
}
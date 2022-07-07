using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using System.Collections.Generic;
using Pagination;

namespace Repository.Data.Operations
{

    public class InventoryRepository : Repository<Inventory>, IInventoryRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public InventoryRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async Task<List<Inventory>> GetAllIncludedEquipamentAsync()
        {
            IQueryable<Inventory> query = _CONTEXT.Inventories
            .AsNoTracking()
            .Include(e => e.Equipament);

            return await query.ToListAsync();
        }
        public async Task<List<Inventory>> GetAllIncludedPartnerAsync()
        {
            IQueryable<Inventory> query = _CONTEXT.Inventories
            .AsNoTracking()
            .Include(e => e.Equipament);
            return await query.ToListAsync();
        }

        public async Task<Inventory> GetAllIncludedByIdAsync(int id)
        {
            IQueryable<Inventory> inventory = _CONTEXT.Inventories
            .AsNoTracking()
            .Include(e => e.Equipament)
            .Include(p => p.Partner);
            
            return await inventory.FirstOrDefaultAsync(_id => _id.Id == id);

        }

        public Task<PagedList<Inventory>> PagedListGetAllIncludedEquipamentAsync()
        {
            throw new System.NotImplementedException();
        }

        // public Task<PagedList<Inventory>> PagedListGetAllIncludedEquipamentAsync(Params parameters)
        // {
        //  IQueryable<Inventory> query = _CONTEXT.Inventories
        //     .AsNoTracking()
        //     .Include(e => e.Equipament);

        //     return await query.ToListAsync();
        // }
    }
}
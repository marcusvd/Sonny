using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using System.Collections.Generic;
using Repository.Helpers;
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
            .Include(e => e.Partner);
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

        public async Task<PagedList<Inventory>> GetPagedAllIncluded(PgParams parameters)
        {
            var resultReturn = GetAllPagination().Include(e => e.Equipament)
            .AsNoTracking();


            if (parameters.Term != null)
            {
                resultReturn = resultReturn
                //  .Include(e => e.Equipament)
                  .Include(e => e.Partner)
                .Where(x => x.Equipament.Name.ToLower().Contains(parameters.Term.ToLower())
                  || x.Model.ToLower().Contains(parameters.Term.ToLower())
                  || x.Manufactorer.ToLower().Contains(parameters.Term.ToLower()));
                  
            }
            resultReturn = resultReturn
                        //  .Include(e => e.Equipament)
                         .Include(e => e.Partner).OrderBy(n => n.Id);

            if (parameters.PgNumber <= 0)
            {
                parameters.PgNumber = 1;
            }
            return await PagedList<Inventory>.ToPagedList(resultReturn, parameters.PgNumber, parameters.PgSize);
        }
    }

}


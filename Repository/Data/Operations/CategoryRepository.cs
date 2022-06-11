using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

namespace Repository.Data.Operations
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private SonnyDbContext _CONTEXT;
        public CategoryRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<List<Category>> GetAllIncludedAsync()
        {
            var query = await _CONTEXT.Categories.AsNoTracking()
            
            .Include(x => x.SubCategories)
            .OrderBy(n => n.Name)
            .ToListAsync();

            return query;

        }








    }
}
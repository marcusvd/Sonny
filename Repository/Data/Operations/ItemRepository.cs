using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class ItemRepository :Repository<Item>, IItemRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ItemRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public Task<Item[]> GetAll(bool include = false)
        {

            IQueryable<Item> query = _CONTEXT.Items
            .AsNoTracking();
          

            return query.ToArrayAsync();
        }

        public async Task<Item> GetByIdAsync(int Id, bool include = false)
        {
            IQueryable<Item> Result = _CONTEXT.Items.AsNoTracking();

            return await Result.FirstOrDefaultAsync(_id => _id.Id == Id);
        }




    }
}